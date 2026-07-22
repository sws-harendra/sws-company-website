const { BlockedIp } = require("../models");
const { Op } = require("sequelize");

function normalizeIp(ip) {
  return typeof ip === "string" ? ip.trim().toLowerCase() : ip;
}

/**
 * Checks if a specific IP is currently blocked.
 * @param {string} ip Client IP address
 * @returns {Promise<boolean>} True if blocked
 */
async function isBlocked(ip) {
  if (!ip) return false;

  const normalizedIp = normalizeIp(ip);
  const now = new Date();

  const rule = await BlockedIp.findOne({
    where: {
      ipAddress: normalizedIp,
      [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: now } }],
    },
  });

  return Boolean(rule);
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
  const normalizedIp = normalizeIp(ipAddress);

  // Insert or update DB
  const [rule] = await BlockedIp.upsert({
    ipAddress: normalizedIp || null,
    countryCode: countryCode ? countryCode.toUpperCase() : null,
    reason: reason || "Administrative Block",
    expiresAt,
  });

  return rule;
}

/**
 * Programmatically removes a block rule.
 * @param {number} id The database entry ID
 */
async function removeBlockById(id) {
  const rule = await BlockedIp.findByPk(id);
  if (rule) {
    await rule.destroy();
  }
}

module.exports = {
  isBlocked,
  addBlock,
  removeBlockById,
};
