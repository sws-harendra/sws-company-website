module.exports = {
  // General Rate Limiting
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 300, // General limit per minute

  // Stricter Rate Limiting for Auth/Sensitive routes
  rateLimitAuthMaxRequests: 30, // 30 attempts per minute (more permissive for human retries)
  rateLimitAuthRoutes: [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
  ],

  // Auto-blocking parameters on abuse
  autoBlockDurationMs: 1 * 60 * 60 * 1000, // 1 hour for general rate limit abuse
  authBruteForceBlockDurationMs: 24 * 60 * 60 * 1000, // 24 hours for authentication abuse
  maxRateLimitViolationsBeforeBlock: 10, // Block IP after 10 limit breaches (instead of 3)

  // Database Logging settings
  dbLoggingEnabled: true,

  // Sensitive request body fields to filter out of logs
  sensitiveFields: [
    "password",
    "token",
    "newPassword",
    "oldPassword",
    "secret",
  ],
};
