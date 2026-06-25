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
    
    // Global search across IP and path
    if (req.query.search) {
      where[Op.or] = [
        { ipAddress: { [Op.like]: `%${req.query.search}%` } },
        { path: { [Op.like]: `%${req.query.search}%` } },
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

    const logsData = logs.map((log) => {
      const item = log.toJSON();
      item.isCurrentlyBlocked = blocker.isBlocked(log.ipAddress);
      return item;
    });

    res.json({
      success: true,
      data: logsData,
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

// Create a new block rule (IP address)
exports.createBlockRule = async (req, res) => {
  try {
    const { ipAddress, reason, durationMs } = req.body;

    if (!ipAddress) {
      return res.status(400).json({
        success: false,
        message: "You must specify a valid IP address.",
      });
    }

    const rule = await blocker.addBlock({
      ipAddress,
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

// Delete/unblock an IP
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
      message: "Block rule deleted. IP unblocked.",
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
      },
    });
  } catch (error) {
    console.error("Error generating security stats:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete/unblock a blocked rule by IP Address directly (useful from logs list)
exports.deleteBlockRuleByIp = async (req, res) => {
  try {
    const { ip } = req.params;

    const rule = await BlockedIp.findOne({ where: { ipAddress: ip } });
    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "No active block rules found for this IP.",
      });
    }

    await blocker.removeBlockById(rule.id);

    res.json({
      success: true,
      message: `IP address ${ip} successfully unblocked.`,
    });
  } catch (error) {
    console.error("Error deleting block rule by IP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

