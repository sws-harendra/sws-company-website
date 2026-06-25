module.exports = {
  // General Rate Limiting
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 150, // General limit per minute

  // Stricter Rate Limiting for Auth/Sensitive routes
  rateLimitAuthMaxRequests: 5, // 5 attempts per minute
  rateLimitAuthRoutes: [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
  ],

  // Auto-blocking parameters on abuse
  autoBlockDurationMs: 1 * 60 * 60 * 1000, // 1 hour for general rate limit abuse
  authBruteForceBlockDurationMs: 24 * 60 * 60 * 1000, // 24 hours for authentication abuse
  maxRateLimitViolationsBeforeBlock: 3, // Block IP after 3 limit breaches

  // GeoIP Lookup settings
  geoLookupEnabled: true,
  geoLookupUrl: "http://ip-api.com/json/", // Free endpoint fallback
  useLocalGeodb: true, // Use local MaxMind MMDB if available
  localGeodbPath: require("path").join(__dirname, "GeoLite2-City.mmdb"),

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
