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
 * @param {string} method HTTP request method (e.g. POST, GET)
 * @returns {Promise<{ allowed: boolean, currentCount: number, limit: number }>}
 */
async function checkRateLimit(ip, path, method) {
  const now = Date.now();

  // Find if there is any custom rate limit rule matching the request path and method
  const matchedRule = config.customRateLimits?.find((rule) => {
    const routeMatch = rule.routes.some((route) => path.startsWith(route));
    const methodMatch = !rule.methods || rule.methods.includes(method);
    return routeMatch && methodMatch;
  });

  const limit = matchedRule ? matchedRule.maxRequests : config.rateLimitMaxRequests;
  const windowMs = matchedRule ? matchedRule.windowMs : config.rateLimitWindowMs;

  // Use a unique key per IP + rule category to isolate request histories
  const storeKey = matchedRule 
    ? `${ip}:custom:${matchedRule.routes.join(",")}:${matchedRule.methods?.join(",") || "all"}`
    : `${ip}:general`;

  if (!requestStore.has(storeKey)) {
    requestStore.set(storeKey, []);
  }

  // Filter out request timestamps that are older than the window
  const timestamps = requestStore.get(storeKey).filter((timestamp) => now - timestamp < windowMs);
  
  if (timestamps.length >= limit) {
    // Limit exceeded! Increment violation count
    const violations = (violationStore.get(storeKey) || 0) + 1;
    violationStore.set(storeKey, violations);

    // Determine the violation threshold before auto-blocking
    const blockImmediately = matchedRule ? matchedRule.blockImmediately : false;
    const violationThreshold = blockImmediately ? 1 : config.maxRateLimitViolationsBeforeBlock;

    // Auto-block if violations exceed threshold
    if (violations >= violationThreshold) {
      const blockDuration = matchedRule 
        ? matchedRule.blockDurationMs 
        : config.autoBlockDurationMs;

      const reason = matchedRule 
        ? matchedRule.reason 
        : "Automated Block: Multiple Rate Limit Violations";

      await blocker.addBlock({
        ipAddress: ip,
        reason,
        durationMs: blockDuration,
      });

      // Clear records for this key
      violationStore.delete(storeKey);
      requestStore.delete(storeKey);

      console.warn(`[Security System] Automatically blocked IP ${ip} for ${blockDuration / 1000 / 60} mins. Reason: ${reason}`);
    }

    return { allowed: false, currentCount: timestamps.length, limit };
  }

  // Add the current request timestamp
  timestamps.push(now);
  requestStore.set(storeKey, timestamps);

  // Clean memory occasionally
  if (requestStore.size > 10000) {
    for (const [key, value] of requestStore.entries()) {
      if (value.length === 0 || now - value[value.length - 1] > 24 * 60 * 60 * 1000) {
        requestStore.delete(key);
      }
    }
  }

  return { allowed: true, currentCount: timestamps.length, limit };
}

module.exports = { checkRateLimit };

