const config = require("./config");
const blocker = require("./blocker");

// Store request histories: Key = ipAddress, Value = Array of timestamps
const requestStore = new Map();

// Store rate limit violations: Key = ipAddress, Value = number of violations
const violationStore = new Map();

/**
 * Checks if a request from a specific IP is allowed under the rate limiting policy.
 * Automatically inserts block rules if a client repeatedly abuses the API.
 * 
 * @param {string} ip Client IP Address
 * @param {string} path Request path
 * @returns {Promise<{ allowed: boolean, currentCount: number, limit: number }>}
 */
async function checkRateLimit(ip, path) {
  const now = Date.now();
  const isAuthRoute = config.rateLimitAuthRoutes.some((route) => path.startsWith(route));
  
  const limit = isAuthRoute ? config.rateLimitAuthMaxRequests : config.rateLimitMaxRequests;
  const windowMs = config.rateLimitWindowMs;

  if (!requestStore.has(ip)) {
    requestStore.set(ip, []);
  }

  // Filter out request timestamps that are older than the window
  const timestamps = requestStore.get(ip).filter((timestamp) => now - timestamp < windowMs);
  
  if (timestamps.length >= limit) {
    // Limit exceeded! Increment violation count
    const violations = (violationStore.get(ip) || 0) + 1;
    violationStore.set(ip, violations);

    // Auto-block if violations exceed threshold
    if (violations >= config.maxRateLimitViolationsBeforeBlock) {
      const blockDuration = isAuthRoute ? config.authBruteForceBlockDurationMs : config.autoBlockDurationMs;
      const reason = isAuthRoute 
        ? "Automated Block: Brute Force Attempt Detected" 
        : "Automated Block: Multiple Rate Limit Violations";

      await blocker.addBlock({
        ipAddress: ip,
        reason,
        durationMs: blockDuration,
      });

      // Clear records for this IP
      violationStore.delete(ip);
      requestStore.delete(ip);

      console.warn(`[Security System] Automatically blocked IP ${ip} for ${blockDuration / 1000 / 60} mins. Reason: ${reason}`);
    }

    return { allowed: false, currentCount: timestamps.length, limit };
  }

  // Add the current request timestamp
  timestamps.push(now);
  requestStore.set(ip, timestamps);

  // Clean memory occasionally
  if (requestStore.size > 10000) {
    for (const [key, value] of requestStore.entries()) {
      if (value.length === 0 || now - value[value.length - 1] > windowMs) {
        requestStore.delete(key);
      }
    }
  }

  return { allowed: true, currentCount: timestamps.length, limit };
}

module.exports = { checkRateLimit };
