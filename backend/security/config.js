module.exports = {
  // General Rate Limiting
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 300, // General limit per minute

  // Custom route rate limits (evaluated before general rate limit rules)
  customRateLimits: [
    {
      routes: ["/api/contacts"],
      methods: ["POST"],
      maxRequests: 5,
      windowMs: 5 * 60 * 1000, // 5 minutes
      blockDurationMs: 2 * 60 * 60 * 1000, // 2 hours
      blockImmediately: true,
      reason: "Automated Block: Contact Submission Spam"
    },
    {
      routes: [
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/forgot-password",
        "/api/auth/reset-password",
      ],
      methods: ["POST"],
      maxRequests: 30, // 30 attempts per minute
      windowMs: 60 * 1000, // 1 minute
      blockDurationMs: 24 * 60 * 60 * 1000, // 24 hours
      blockImmediately: false,
      reason: "Automated Block: Brute Force Attempt Detected"
    }
  ],

  // Default parameters for routes not covered by custom rules or if blockImmediately is false
  autoBlockDurationMs: 1 * 60 * 60 * 1000, // 1 hour for general rate limit abuse
  maxRateLimitViolationsBeforeBlock: 10, // Block IP after 10 limit breaches for general limit

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

