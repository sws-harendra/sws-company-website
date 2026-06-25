const config = require("./config");

// Simple in-memory cache to store IP geolocations
const geoCache = new Map();

// Helper to determine if an IP is a local/loopback address
function isLocalIp(ip) {
  if (!ip) return true;
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "localhost" ||
    ip.startsWith("::ffff:127.0.0.1") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  );
}

/**
 * Resolves IP address location information on-demand via ip-api.com.
 * Caches results in memory to minimize external network requests.
 * @param {string} ip Address to look up
 * @returns {Promise<{ country: string|null, countryCode: string|null, region: string|null, city: string|null }>}
 */
async function lookupIp(ip) {
  if (isLocalIp(ip)) {
    return { country: "Local Network", countryCode: "LOCAL", region: "Local", city: "Local" };
  }

  // Clean IP address if it is IPv4-mapped IPv6 (e.g. ::ffff:192.0.2.1)
  const cleanIp = ip.startsWith("::ffff:") ? ip.substring(7) : ip;

  if (geoCache.has(cleanIp)) {
    return geoCache.get(cleanIp);
  }

  try {
    const response = await fetch(`${config.geoLookupUrl}${cleanIp}`);
    if (!response.ok) {
      throw new Error(`GeoIP lookup failed with status: ${response.status}`);
    }
    const data = await response.json();

    const geoData = {
      country: data.country || null,
      countryCode: data.countryCode || null,
      region: data.regionName || data.region || null,
      city: data.city || null
    };

    // Cache the result
    geoCache.set(cleanIp, geoData);
    
    // Clear cache if it grows too large (e.g. 5000 items) to prevent memory leak
    if (geoCache.size > 5000) {
      const firstKey = geoCache.keys().next().value;
      geoCache.delete(firstKey);
    }

    return geoData;
  } catch (error) {
    console.error(`Error performing GeoIP lookup for IP ${cleanIp}:`, error.message);
    return { country: null, countryCode: null, region: null, city: null };
  }
}

module.exports = { lookupIp };
