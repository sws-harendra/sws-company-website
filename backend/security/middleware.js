const { SystemLog } = require("../models");
const config = require("./config");
const blocker = require("./blocker");
const limiter = require("./limiter");
const { parseUserAgent } = require("./uaParser");

// Helper to extract client real IP address
function getClientIp(req) {
  return (
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    null
  );
}

// Helper to filter out sensitive keys (passwords, secrets) from JSON bodies
function sanitizeData(data) {
  if (!data || typeof data !== "object") return data;
  
  const sanitized = { ...data };
  config.sensitiveFields.forEach((field) => {
    if (field in sanitized) {
      sanitized[field] = "********";
    }
  });
  return sanitized;
}

/**
 * Express middleware that checks client block status, rate-limiting, and logs request details.
 * Performs NO network lookups at request time to ensure 100% privacy and speed.
 */
async function securityMiddleware(req, res, next) {
  const startTime = Date.now();
  const ipAddress = getClientIp(req);
  const userAgent = req.headers["user-agent"] || null;
  const path = req.baseUrl + req.path;

  // Parse User Agent to extract OS, Browser, and Device metadata
  const uaMeta = parseUserAgent(userAgent);

  // 1. Check IP block list (High-speed in-memory check, no database or network calls)
  if (await blocker.isBlocked(ipAddress)) {
    // Log blocked request immediately
    if (config.dbLoggingEnabled) {
      SystemLog.create({
        ipAddress,
        method: req.method,
        path,
        query: req.query && Object.keys(req.query).length ? JSON.stringify(req.query) : null,
        body: req.body && Object.keys(req.body).length ? JSON.stringify(sanitizeData(req.body)) : null,
        status: 403,
        duration: 0,
        userAgent,
        userId: req.user?.id || null,
        os: uaMeta.os,
        browser: uaMeta.browser,
        device: uaMeta.device,
        isBlocked: true,
      }).catch((err) => console.error("Error creating block system log:", err.message));
    }
    
    return res.status(403).json({
      error: "Forbidden",
      message: "Access denied. Your IP address has been blocked.",
    });
  }

  // 2. Check Rate Limit
  const rateLimitResult = await limiter.checkRateLimit(ipAddress, path);
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please try again later.",
      limit: rateLimitResult.limit,
    });
  }

  // 3. Log Request on response finish
  res.on("finish", async () => {
    const duration = Date.now() - startTime;
    if (!config.dbLoggingEnabled) return;

    // Check path exclusion (e.g. skip logs for static assets)
    if (path.startsWith("/uploads/") || path.includes("/static/")) return;

    try {
      // Create system log entry with client OS/browser/device details
      await SystemLog.create({
        ipAddress,
        method: req.method,
        path,
        query: req.query && Object.keys(req.query).length ? JSON.stringify(req.query) : null,
        body: req.body && Object.keys(req.body).length ? JSON.stringify(sanitizeData(req.body)) : null,
        status: res.statusCode,
        duration,
        userAgent,
        userId: req.user?.id || null,
        os: uaMeta.os,
        browser: uaMeta.browser,
        device: uaMeta.device,
        isBlocked: false,
      });
    } catch (logErr) {
      console.error("[Security System] Failed to write SystemLog:", logErr.message);
    }
  });

  next();
}

module.exports = {
  securityMiddleware,
  getClientIp,
};
