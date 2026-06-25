const { BlockedIp } = require("../models");
const { Op } = require("sequelize");

// High-speed caches for blocked IPs and countries
const blockedIps = new Set();
const blockedCountries = new Set();

/**
 * Initializes and synchronizes the blocked lists cache from the database.
 */
async function initBlocker() {
  try {
    const now = new Date();
    // Fetch all active block rules (permanent rules or rules with expiresAt > now)
    const activeBlocks = await BlockedIp.findAll({
      where: {
        [Op.or]: [
          { expiresAt: null },
          { expiresAt: { [Op.gt]: now } }
        ]
      }
    });

    // Clear and reload sets
    blockedIps.clear();
    blockedCountries.clear();

    activeBlocks.forEach((rule) => {
      if (rule.ipAddress) {
        blockedIps.add(rule.ipAddress);
      }
      if (rule.countryCode) {
        blockedCountries.add(rule.countryCode.toUpperCase());
      }
    });

    console.log(`[Security System] Loaded ${blockedIps.size} blocked IPs and ${blockedCountries.size} blocked countries.`);
  } catch (error) {
    console.error("[Security System] Failed to load blocked rules from database:", error.message);
  }
}

/**
 * Checks if a specific IP is currently blocked.
 * @param {string} ip Client IP address
 * @returns {boolean} True if blocked
 */
function isBlocked(ip) {
  return ip && blockedIps.has(ip);
}

/**
 * Programmatically inserts an IP address or country code into the block rules.
 * @param {object} params
 * @param {string} [params.ipAddress]
 * @param {string} [params.countryCode]
 * @param {string} [params.reason]
 * @param {number} [params.durationMs]
 * @returns {Promise<object>} The database BlockedIp record
 */
async function addBlock({ ipAddress, countryCode, reason, durationMs }) {
  const expiresAt = durationMs ? new Date(Date.now() + durationMs) : null;

  // Insert or update DB
  const [rule] = await BlockedIp.upsert({
    ipAddress: ipAddress || null,
    countryCode: countryCode ? countryCode.toUpperCase() : null,
    reason: reason || "Administrative Block",
    expiresAt,
  });

  // Update high-speed memory cache
  if (ipAddress) blockedIps.add(ipAddress);
  if (countryCode) blockedCountries.add(countryCode.toUpperCase());

  return rule;
}

/**
 * Programmatically removes a block rule.
 * @param {number} id The database entry ID
 */
async function removeBlockById(id) {
  const rule = await BlockedIp.findByPk(id);
  if (rule) {
    if (rule.ipAddress) blockedIps.delete(rule.ipAddress);
    if (rule.countryCode) blockedCountries.delete(rule.countryCode.toUpperCase());
    await rule.destroy();
  }
}

module.exports = {
  initBlocker,
  isBlocked,
  addBlock,
  removeBlockById,
};
