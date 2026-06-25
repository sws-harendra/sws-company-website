const { SystemLog, BlockedIp, User } = require("../models");
const blocker = require("../security/blocker");
const { Op } = require("sequelize");

// Retrieve paginated, filterable API access logs
exports.getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const where = {};
    if (req.query.isBlocked !== undefined) {
      where.isBlocked = req.query.isBlocked === "true";
    }
    if (req.query.method) {
      where.method = req.query.method;
    }
    if (req.query.status) {
      where.status = parseInt(req.query.status);
    }
    
    // Global search across IP, path, country, and city
    if (req.query.search) {
      where[Op.or] = [
        { ipAddress: { [Op.like]: `%${req.query.search}%` } },
        { path: { [Op.like]: `%${req.query.search}%` } },
        { country: { [Op.like]: `%${req.query.search}%` } },
        { city: { [Op.like]: `%${req.query.search}%` } },
      ];
    }

    const { count, rows: logs } = await SystemLog.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json({
      success: true,
      data: logs,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error retrieving logs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Retrieve currently active blocked IPs and countries
exports.getBlockedRules = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const { count, rows: blocks } = await BlockedIp.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: blocks,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error retrieving blocked rules:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new block rule (either IP address or Country code)
exports.createBlockRule = async (req, res) => {
  try {
    const { ipAddress, countryCode, reason, durationMs } = req.body;

    if (!ipAddress && !countryCode) {
      return res.status(400).json({
        success: false,
        message: "You must specify either an IP address or a country code.",
      });
    }

    const rule = await blocker.addBlock({
      ipAddress: ipAddress || null,
      countryCode: countryCode || null,
      reason: reason || "Manual Admin Block",
      durationMs: durationMs ? parseInt(durationMs) : null,
    });

    res.status(201).json({
      success: true,
      message: "Block rule successfully created.",
      data: rule,
    });
  } catch (error) {
    console.error("Error creating block rule:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete/unblock an IP or Country
exports.deleteBlockRule = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await BlockedIp.findByPk(id);
    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Block rule not found.",
      });
    }

    await blocker.removeBlockById(id);

    res.json({
      success: true,
      message: "Block rule deleted. IP/Country unblocked.",
    });
  } catch (error) {
    console.error("Error deleting block rule:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Retrieve security analytics overview for Dashboard charts
exports.getSecurityStats = async (req, res) => {
  try {
    const totalRequests = await SystemLog.count();
    const blockedRequests = await SystemLog.count({ where: { isBlocked: true } });
    
    // Top 5 Blocked IPs
    const topBlockedIps = await SystemLog.findAll({
      attributes: ["ipAddress", [SystemLog.sequelize.fn("COUNT", "ipAddress"), "count"]],
      where: { isBlocked: true },
      group: ["ipAddress"],
      order: [[SystemLog.sequelize.literal("count"), "DESC"]],
      limit: 5,
    });

    // Top 5 requesting countries
    const topCountries = await SystemLog.findAll({
      attributes: ["country", "countryCode", [SystemLog.sequelize.fn("COUNT", "country"), "count"]],
      where: { country: { [Op.ne]: null } },
      group: ["country", "countryCode"],
      order: [[SystemLog.sequelize.literal("count"), "DESC"]],
      limit: 5,
    });

    // 4xx/5xx error logs rate
    const errorCount = await SystemLog.count({
      where: {
        status: { [Op.gte]: 400 },
      },
    });

    res.json({
      success: true,
      stats: {
        totalRequests,
        blockedRequests,
        errorCount,
        errorRate: totalRequests ? ((errorCount / totalRequests) * 100).toFixed(2) : 0,
        blockedRate: totalRequests ? ((blockedRequests / totalRequests) * 100).toFixed(2) : 0,
        topBlockedIps,
        topCountries,
      },
    });
  } catch (error) {
    console.error("Error generating security stats:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// On-demand location lookup for specific SystemLog IP
exports.lookupLogLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await SystemLog.findByPk(id);
    
    if (!log) {
      return res.status(404).json({ success: false, message: "Log entry not found." });
    }

    // Return stored location directly if already resolved
    if (log.country || log.countryCode) {
      return res.json({
        success: true,
        data: {
          country: log.country,
          countryCode: log.countryCode,
          region: log.region,
          city: log.city,
        },
      });
    }

    if (!log.ipAddress) {
      return res.status(400).json({ success: false, message: "No IP address linked to this log." });
    }

    // Trigger on-demand lookup
    const ipLookup = require("../security/ipLookup");
    const geoData = await ipLookup.lookupIp(log.ipAddress);

    // Save lookup data directly into database SystemLogs row
    log.country = geoData.country;
    log.countryCode = geoData.countryCode;
    log.region = geoData.region;
    log.city = geoData.city;
    await log.save();

    res.json({
      success: true,
      data: geoData,
    });
  } catch (error) {
    console.error("Error performing on-demand IP lookup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

