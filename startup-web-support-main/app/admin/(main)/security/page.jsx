"use client";
import React, { useEffect, useState } from "react";

import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Search,
  Filter,
  User,
  Clock,
  Globe,
  Trash2,
  AlertTriangle,
  Plus,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  getSecurityLogs,
  lookupLogLocation,
  getSecurityStats,
  getBlockedRules,
  addBlockRule,
  deleteBlockRule,
} from "@/services/security.service";
import { useAdminTheme } from "../context/AdminThemeContext";

export default function SecurityPage() {
  const { isAdminDark } = useAdminTheme();

  // Tab control: "logs" or "blocks"
  const [activeTab, setActiveTab] = useState("logs");

  // Loading states
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const [submittingBlock, setSubmittingBlock] = useState(false);

  // Data states
  const [logs, setLogs] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    blockedRequests: 0,
    errorCount: 0,
    errorRate: "0.00",
    blockedRate: "0.00",
    topBlockedIps: [],
    topCountries: [],
  });

  // Log filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBlocked, setFilterBlocked] = useState("all"); // "all", "blocked", "allowed"
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [logPage, setLogPage] = useState(1);
  const [logTotalPages, setLogTotalPages] = useState(1);

  // Block rule page/modal states
  const [blockPage, setBlockPage] = useState(1);
  const [blockTotalPages, setBlockTotalPages] = useState(1);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);

  // New Block Form
  const [blockForm, setBlockForm] = useState({
    type: "ip", // "ip" or "country"
    target: "",
    reason: "",
    duration: "permanent", // "1h", "24h", "permanent"
  });

  // Log details drawer state
  const [selectedLog, setSelectedLog] = useState(null);

  // Fetch functions
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await getSecurityStats();
      if (res.success) setStats(res.stats);
    } catch (err) {
      console.error(err);
      // Fallback stats for UI view
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const params = {
        page: logPage,
        limit: 15,
        search: searchTerm || undefined,
        method: filterMethod !== "all" ? filterMethod : undefined,
        status: filterStatus !== "all" ? filterStatus : undefined,
        isBlocked:
          filterBlocked === "blocked"
            ? "true"
            : filterBlocked === "allowed"
              ? "false"
              : undefined,
      };
      const res = await getSecurityLogs(params);
      if (res.success) {
        setLogs(res.data);
        setLogTotalPages(res.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load access logs");
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchBlocks = async () => {
    setLoadingBlocks(true);
    try {
      const res = await getBlockedRules({ page: blockPage, limit: 15 });
      if (res.success) {
        setBlocks(res.data);
        setBlockTotalPages(res.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load block rules");
    } finally {
      setLoadingBlocks(false);
    }
  };

  const handleResolveLocation = async (id) => {
    try {
      const res = await lookupLogLocation(id);
      if (res.success) {
        toast.success("Location resolved successfully!");
        
        // Update the log in the local logs list state
        setLogs((prevLogs) =>
          prevLogs.map((item) =>
            item.id === id
              ? {
                  ...item,
                  country: res.data.country,
                  countryCode: res.data.countryCode,
                  region: res.data.region,
                  city: res.data.city,
                }
              : item
          )
        );

        // Update selectedLog if it is currently open
        if (selectedLog && selectedLog.id === id) {
          setSelectedLog((prev) => ({
            ...prev,
            country: res.data.country,
            countryCode: res.data.countryCode,
            region: res.data.region,
            city: res.data.city,
          }));
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to resolve IP location");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    } else {
      fetchBlocks();
    }
  }, [
    activeTab,
    logPage,
    blockPage,
    filterBlocked,
    filterMethod,
    filterStatus,
  ]);

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLogPage(1);
    fetchLogs();
  };

  // Block IP directly from logs
  const handleQuickBlock = async (ip, countryCode) => {
    if (!confirm(`Are you sure you want to block IP address: ${ip}?`)) return;
    try {
      const res = await addBlockRule({
        ipAddress: ip,
        countryCode: countryCode || undefined,
        reason: "Quick Manual Block from Access Logs",
        durationMs: undefined, // permanent
      });
      if (res.success) {
        toast.success("IP successfully blocked");
        fetchStats();
        if (activeTab === "blocks") fetchBlocks();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to block IP");
    }
  };

  // Create block rule
  const handleCreateBlockRule = async (e) => {
    e.preventDefault();
    if (!blockForm.target) {
      toast.error("Please enter a valid IP address or Country Code");
      return;
    }

    setSubmittingBlock(true);
    try {
      let durationMs = undefined;
      if (blockForm.duration === "1h") durationMs = 60 * 60 * 1000;
      if (blockForm.duration === "24h") durationMs = 24 * 60 * 60 * 1000;

      const payload = {
        ipAddress: blockForm.type === "ip" ? blockForm.target : undefined,
        countryCode:
          blockForm.type === "country" ? blockForm.target : undefined,
        reason: blockForm.reason || "Manual Block",
        durationMs,
      };

      const res = await addBlockRule(payload);
      if (res.success) {
        toast.success("Block rule added successfully");
        setIsAddBlockOpen(false);
        setBlockForm({
          type: "ip",
          target: "",
          reason: "",
          duration: "permanent",
        });
        fetchStats();
        fetchBlocks();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create block rule");
    } finally {
      setSubmittingBlock(false);
    }
  };

  // Delete block rule
  const handleDeleteBlock = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this rule and unblock this target?",
      )
    )
      return;
    try {
      const res = await deleteBlockRule(id);
      if (res.success) {
        toast.success("Target successfully unblocked");
        fetchStats();
        fetchBlocks();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to unblock target");
    }
  };

  // UI styling classes
  const themeCardClass = `p-5 rounded-2xl border transition-all duration-200 ${
    isAdminDark
      ? "bg-zinc-900 border-zinc-800"
      : "bg-white border-zinc-100 shadow-xs"
  }`;

  const themeInputClass = `px-3 py-2 text-sm rounded-xl outline-none border transition-all duration-150 ${
    isAdminDark
      ? "bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-[#029bd2]"
      : "bg-white border-zinc-200 text-zinc-800 focus:border-[#029bd2]"
  }`;

  const getMethodBadge = (method) => {
    const colors = {
      GET: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      POST: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      PUT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      DELETE: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };
    return (
      <span
        className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${colors[method] || "bg-zinc-500/10 text-zinc-500"}`}
      >
        {method}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="text-zinc-500">-</span>;
    let colorClass = "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    if (status >= 200 && status < 300)
      colorClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (status >= 300 && status < 400)
      colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (status >= 400 && status < 500)
      colorClass = "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (status >= 500)
      colorClass = "bg-rose-500/10 text-rose-500 border-rose-500/20";

    return (
      <span
        className={`px-2 py-0.5 text-xs font-mono font-semibold rounded-md border ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      className={`flex-1 flex flex-col space-y-6 transition-colors duration-300 ${
        isAdminDark ? "text-zinc-100" : "text-zinc-800"
      }`}
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Security & Request Logs
          </h1>
          <p
            className={`text-sm ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
          >
            Monitor client API activity, locate requests, rate limit traffic,
            and manage firewall blocks dynamically.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              fetchStats();
              activeTab === "logs" ? fetchLogs() : fetchBlocks();
              toast.success("Data reloaded");
            }}
            className={`p-2.5 rounded-xl border flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
              isAdminDark
                ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300"
                : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-600"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-semibold">Reload</span>
          </button>
          <button
            onClick={() => setIsAddBlockOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#029bd2] hover:bg-[#029bd2]/90 text-white text-xs font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Block Rule</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={themeCardClass}>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-xs font-semibold ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Total API Traffic
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Terminal className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono">
            {stats.totalRequests.toLocaleString()}
          </h3>
          <p className="text-xs mt-1 text-zinc-400">
            Total processed server requests
          </p>
        </div>

        <div className={themeCardClass}>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-xs font-semibold ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Blocked Requests
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-rose-500">
            {stats.blockedRequests.toLocaleString()}
          </h3>
          <p className="text-xs mt-1 text-zinc-400">
            {stats.blockedRate}% of all attempts blocked
          </p>
        </div>

        <div className={themeCardClass}>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-xs font-semibold ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Error Logs (4xx/5xx)
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-mono text-amber-500">
            {stats.errorCount.toLocaleString()}
          </h3>
          <p className="text-xs mt-1 text-zinc-400">
            {stats.errorRate}% server/client error rate
          </p>
        </div>

        <div className={themeCardClass}>
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-xs font-semibold ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              Global Client Geolocation
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-base font-bold truncate">
            {stats.topCountries[0]
              ? `${stats.topCountries[0].country} (${stats.topCountries[0].count})`
              : "None"}
          </h3>
          <p className="text-xs mt-1 text-zinc-400">
            Primary traffic origin region
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => {
            setActiveTab("logs");
            setLogPage(1);
          }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all cursor-pointer ${
            activeTab === "logs"
              ? "border-[#029bd2] text-[#029bd2]"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          Access Audit Logs
        </button>
        <button
          onClick={() => {
            setActiveTab("blocks");
            setBlockPage(1);
          }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all cursor-pointer ${
            activeTab === "blocks"
              ? "border-[#029bd2] text-[#029bd2]"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          Blocked IPs & Countries
        </button>
      </div>

      {/* Tab 1: Access Logs */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          {/* Logs Filters Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="relative flex-1 min-w-[240px]">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isAdminDark ? "text-zinc-500" : "text-zinc-400"}`}
              />
              <input
                type="text"
                placeholder="Search Client IP, URI, country, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${themeInputClass} w-full pl-9`}
              />
            </div>

            <select
              value={filterBlocked}
              onChange={(e) => {
                setFilterBlocked(e.target.value);
                setLogPage(1);
              }}
              className={themeInputClass}
            >
              <option value="all">Security: All Traffic</option>
              <option value="allowed">Allowed only</option>
              <option value="blocked">Blocked only</option>
            </select>

            <select
              value={filterMethod}
              onChange={(e) => {
                setFilterMethod(e.target.value);
                setLogPage(1);
              }}
              className={themeInputClass}
            >
              <option value="all">Methods: All</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setLogPage(1);
              }}
              className={themeInputClass}
            >
              <option value="all">Status: All</option>
              <option value="200">200 OK</option>
              <option value="400">400 Bad Request</option>
              <option value="401">401 Unauthorized</option>
              <option value="403">403 Forbidden</option>
              <option value="429">429 Rate Limited</option>
              <option value="500">500 Server Error</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 transition cursor-pointer"
            >
              Filter
            </button>
          </form>

          {/* Table Container */}
          <div
            className={`overflow-x-auto rounded-2xl border ${
              isAdminDark
                ? "border-zinc-800 bg-zinc-950"
                : "border-zinc-200 bg-white shadow-xs"
            }`}
          >
            <table className="w-full text-sm text-left">
              <thead
                className={`text-xs font-bold uppercase tracking-wider border-b ${
                  isAdminDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                    : "bg-zinc-50 border-zinc-200 text-zinc-500"
                }`}
              >
                <tr>
                  <th className="px-5 py-3.5">Timestamp</th>
                  <th className="px-5 py-3.5">Method</th>
                  <th className="px-5 py-3.5">Path</th>
                  <th className="px-5 py-3.5">IP Address</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Latency</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {loadingLogs ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#029bd2]" />
                        <span className="text-zinc-500">
                          Retrieving security audit logs...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-zinc-500">
                      No logs found matching your filters.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className={`hover:bg-zinc-500/5 transition ${
                        log.isBlocked
                          ? "bg-rose-500/5 hover:bg-rose-500/10"
                          : ""
                      }`}
                    >
                      <td className="px-5 py-3 font-mono text-xs whitespace-nowrap text-zinc-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        {getMethodBadge(log.method)}
                      </td>
                      <td
                        className="px-5 py-3 font-semibold font-mono text-xs truncate max-w-[200px]"
                        title={log.path}
                      >
                        {log.path}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs whitespace-nowrap">
                        {log.ipAddress}
                      </td>
                      <td className="px-5 py-3">
                        {log.country ? (
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                              {log.country}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {log.city || log.region || "-"}
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolveLocation(log.id);
                            }}
                            className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 border border-sky-500/20 text-[10px] font-bold rounded-md flex items-center gap-1 transition cursor-pointer"
                          >
                            <Globe className="w-3 h-3 animate-pulse" />
                            <span>Lookup</span>
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {getStatusBadge(log.status)}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-right text-zinc-500 whitespace-nowrap">
                        {log.duration !== null ? `${log.duration} ms` : "-"}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="p-1 rounded-md text-[#029bd2] hover:bg-[#029bd2]/10 transition"
                            title="Inspect Payload Data"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {!log.isBlocked && (
                            <button
                              onClick={() =>
                                handleQuickBlock(log.ipAddress, log.countryCode)
                              }
                              className="p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition"
                              title="Block IP Address"
                            >
                              <ShieldAlert className="w-4 h-4" />
                            </button>
                          )}

                          {log.isBlocked && (
                            <span
                              className="p-1 text-rose-500"
                              title="Blocked request"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {logTotalPages > 1 && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-zinc-500">
                Page {logPage} of {logTotalPages}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={logPage === 1}
                  onClick={() => setLogPage((p) => Math.max(1, p - 1))}
                  className="p-2 border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-500/5 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={logPage === logTotalPages}
                  onClick={() =>
                    setLogPage((p) => Math.min(logTotalPages, p + 1))
                  }
                  className="p-2 border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-500/5 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Blocked IPs & Countries */}
      {activeTab === "blocks" && (
        <div className="space-y-4">
          <div
            className={`overflow-x-auto rounded-2xl border ${
              isAdminDark
                ? "border-zinc-800 bg-zinc-950"
                : "border-zinc-200 bg-white shadow-xs"
            }`}
          >
            <table className="w-full text-sm text-left">
              <thead
                className={`text-xs font-bold uppercase tracking-wider border-b ${
                  isAdminDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                    : "bg-zinc-50 border-zinc-200 text-zinc-500"
                }`}
              >
                <tr>
                  <th className="px-5 py-3.5">Rule Target</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Reason</th>
                  <th className="px-5 py-3.5">Blocked At</th>
                  <th className="px-5 py-3.5">Expires At</th>
                  <th className="px-5 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {loadingBlocks ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-[#029bd2]" />
                        <span className="text-zinc-500">
                          Retrieving active block rules...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : blocks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-zinc-500">
                      No active firewalls block rules found.
                    </td>
                  </tr>
                ) : (
                  blocks.map((block) => (
                    <tr
                      key={block.id}
                      className="hover:bg-zinc-500/5 transition"
                    >
                      <td className="px-5 py-3 font-semibold font-mono text-sm">
                        {block.ipAddress || block.countryCode}
                      </td>
                      <td className="px-5 py-3">
                        {block.ipAddress ? (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            IP ADDRESS
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-purple-500/10 text-purple-500 border border-purple-500/20">
                            COUNTRY ({block.countryCode})
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                        {block.reason || "-"}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs whitespace-nowrap text-zinc-500">
                        {new Date(block.blockedAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs whitespace-nowrap text-zinc-500">
                        {block.expiresAt ? (
                          <span className="text-amber-500 font-semibold">
                            {new Date(block.expiresAt).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-rose-500 font-semibold">
                            Permanent
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => handleDeleteBlock(block.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                          title="Unblock target"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {blockTotalPages > 1 && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-zinc-500">
                Page {blockPage} of {blockTotalPages}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={blockPage === 1}
                  onClick={() => setBlockPage((p) => Math.max(1, p - 1))}
                  className="p-2 border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-500/5 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={blockPage === blockTotalPages}
                  onClick={() =>
                    setBlockPage((p) => Math.min(blockTotalPages, p + 1))
                  }
                  className="p-2 border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-500/5 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Block Rule Modal */}
      {isAddBlockOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-xl overflow-hidden transition-all duration-200 ${
              isAdminDark
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-100"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base">Add Firewall Block Rule</h3>
              </div>
              <button
                onClick={() => setIsAddBlockOpen(false)}
                className={`p-1.5 rounded-lg hover:bg-zinc-500/10 cursor-pointer ${
                  isAdminDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateBlockRule} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Block Target Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setBlockForm({ ...blockForm, type: "ip", target: "" })
                    }
                    className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      blockForm.type === "ip"
                        ? "bg-[#029bd2] border-[#029bd2] text-white"
                        : isAdminDark
                          ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    IP Address
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBlockForm({
                        ...blockForm,
                        type: "country",
                        target: "",
                      })
                    }
                    className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      blockForm.type === "country"
                        ? "bg-[#029bd2] border-[#029bd2] text-white"
                        : isAdminDark
                          ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    Country Code
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  {blockForm.type === "ip"
                    ? "IP Address to Block"
                    : "Country ISO Code (2 Letters)"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    blockForm.type === "ip"
                      ? "e.g. 198.51.100.42"
                      : "e.g. RU, CN, KP"
                  }
                  value={blockForm.target}
                  onChange={(e) =>
                    setBlockForm({ ...blockForm, target: e.target.value })
                  }
                  className={`${themeInputClass} w-full`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Block Duration
                </label>
                <select
                  value={blockForm.duration}
                  onChange={(e) =>
                    setBlockForm({ ...blockForm, duration: e.target.value })
                  }
                  className={`${themeInputClass} w-full`}
                >
                  <option value="permanent">Permanent / Indefinite</option>
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5">
                  Reason for Block
                </label>
                <textarea
                  placeholder="Describe why this user or location is being blocked..."
                  value={blockForm.reason}
                  onChange={(e) =>
                    setBlockForm({ ...blockForm, reason: e.target.value })
                  }
                  rows="3"
                  className={`${themeInputClass} w-full resize-none`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddBlockOpen(false)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isAdminDark
                      ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBlock}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                >
                  {submittingBlock ? "Applying..." : "Apply Firewall Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Log details Drawer/Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div
            className={`h-full w-full max-w-xl border-l flex flex-col transition-all duration-200 ${
              isAdminDark
                ? "bg-zinc-950 border-zinc-800"
                : "bg-white border-zinc-200"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#029bd2]" />
                <h3 className="font-bold text-lg">Detailed Request Audit</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className={`p-1.5 rounded-lg hover:bg-zinc-500/10 cursor-pointer ${
                  isAdminDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                &times;
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Request Status & Path */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  {getMethodBadge(selectedLog.method)}
                  {getStatusBadge(selectedLog.status)}
                  <span className="font-mono text-xs text-zinc-500">
                    {new Date(selectedLog.createdAt).toLocaleString()}
                  </span>
                </div>
                <h4 className="font-mono font-bold text-sm bg-zinc-500/5 p-3 rounded-xl border border-zinc-500/10 break-all select-all">
                  {selectedLog.path}
                </h4>
              </div>

              {/* GeoIP Location Map */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Network Geolocation
                  </h5>
                  {!selectedLog.country && (
                    <button
                      onClick={() => handleResolveLocation(selectedLog.id)}
                      className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 border border-sky-500/20 text-[10px] font-bold rounded-md flex items-center gap-1 transition cursor-pointer"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Lookup Location</span>
                    </button>
                  )}
                </div>
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-4 ${
                    isAdminDark
                      ? "bg-zinc-900 border-zinc-800"
                      : "bg-zinc-50 border-zinc-100"
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 block">
                      IP ADDRESS
                    </span>
                    <span className="font-mono text-xs font-semibold">
                      {selectedLog.ipAddress}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">
                      COUNTRY
                    </span>
                    <span className="text-xs font-semibold">
                      {selectedLog.country || "Local / Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">
                      REGION & CITY
                    </span>
                    <span className="text-xs font-semibold">
                      {selectedLog.city
                        ? `${selectedLog.region}, ${selectedLog.city}`
                        : "Unknown"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">
                      LATENCY (PROCESSING)
                    </span>
                    <span className="text-xs font-semibold font-mono">
                      {selectedLog.duration} ms
                    </span>
                  </div>
                </div>
              </div>

              {/* User Agent */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Client User Agent
                </h5>
                <p
                  className={`p-3 rounded-xl border font-mono text-xs ${
                    isAdminDark
                      ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                      : "bg-zinc-50 border-zinc-100 text-zinc-600"
                  }`}
                >
                  {selectedLog.userAgent || "No user-agent header provided"}
                </p>
              </div>

              {/* User Info */}
              {selectedLog.User && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Authenticated Admin User
                  </h5>
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-3 ${
                      isAdminDark
                        ? "bg-zinc-900 border-zinc-800"
                        : "bg-zinc-50 border-zinc-100"
                    }`}
                  >
                    <div className="p-2 rounded-full bg-[#029bd2]/10 text-[#029bd2]">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">
                        {selectedLog.User.name}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {selectedLog.User.email}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Request Parameters (Query) */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Query Parameters
                </h5>
                <pre
                  className={`p-3 rounded-xl border font-mono text-xs overflow-x-auto ${
                    isAdminDark
                      ? "bg-zinc-900 border-zinc-800 text-emerald-400"
                      : "bg-zinc-50 border-zinc-100 text-emerald-600"
                  }`}
                >
                  {selectedLog.query
                    ? JSON.stringify(JSON.parse(selectedLog.query), null, 2)
                    : "{}"}
                </pre>
              </div>

              {/* Request Body Payload */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  HTTP POST/PUT Body Payload
                </h5>
                <pre
                  className={`p-3 rounded-xl border font-mono text-xs overflow-x-auto ${
                    isAdminDark
                      ? "bg-zinc-900 border-zinc-800 text-sky-400"
                      : "bg-zinc-50 border-zinc-100 text-sky-600"
                  }`}
                >
                  {selectedLog.body
                    ? JSON.stringify(JSON.parse(selectedLog.body), null, 2)
                    : "No body content / Empty"}
                </pre>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedLog(null)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                  isAdminDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                    : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                Close
              </button>

              {!selectedLog.isBlocked && (
                <button
                  onClick={() => {
                    handleQuickBlock(
                      selectedLog.ipAddress,
                      selectedLog.countryCode,
                    );
                    setSelectedLog(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer"
                >
                  Block This IP
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
