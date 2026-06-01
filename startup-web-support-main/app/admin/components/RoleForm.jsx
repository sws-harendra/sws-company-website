"use client";
import { useState, useEffect } from "react";
import { RoleService } from "@/services/roleService";
import { PermissionService } from "@/services/permissionService";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminTheme } from "../(main)/context/AdminThemeContext";
import {
  ShieldPlus,
  Key,
  CheckSquare,
  Square,
  Shield,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

export default function RoleForm() {
  const { isAdminDark } = useAdminTheme();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [expandedRole, setExpandedRole] = useState(null);

  const fetchRoles = async () => {
    const data = await RoleService.getAll();
    setRoles(data);
  };

  useEffect(() => {
    PermissionService.getAll().then(setPermissions);
    fetchRoles();
  }, []);

  const handleCreate = async () => {
    if (!name) {
      toast.error("Role name required");
      return;
    }
    setLoading(true);
    try {
      const role = await RoleService.create({ name });
      if (selected.length) {
        await RoleService.assignPermissions({
          roleId: role.id,
          permissionIds: selected,
        });
      }
      toast.success("Role created successfully!");
      setName("");
      setSelected([]);
      fetchRoles();
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === permissions.length) {
      setSelected([]);
    } else {
      setSelected(permissions.map((p) => p.id));
    }
  };

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition-all duration-200
    ${
      isAdminDark
        ? "bg-zinc-800/60 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-[#029bd2] focus:ring-1 focus:ring-[#029bd2]/40"
        : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-[#029bd2] focus:ring-1 focus:ring-[#029bd2]/30"
    }`;

  const labelClass = `text-xs font-semibold uppercase tracking-wide mb-1.5 block ${
    isAdminDark ? "text-zinc-400" : "text-zinc-500"
  }`;

  const cardBase = `rounded-2xl border transition-colors duration-300 ${
    isAdminDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
  }`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* ── LEFT: Create Role Form ────────────────────────────── */}
      <motion.div
        className={`${cardBase} p-6 shadow-lg w-full lg:max-w-sm flex-shrink-0`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#1a4468]/10 border border-[#1a4468]/20">
            <ShieldPlus
              className={`w-5 h-5 ${
                isAdminDark ? "text-[#029bd2]" : "text-[#1a4468]"
              }`}
            />
          </div>
          <div>
            <h2
              className={`text-base font-semibold ${
                isAdminDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              Create Role
            </h2>
            <p
              className={`text-xs ${
                isAdminDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              Define roles &amp; assign permissions
            </p>
          </div>
        </div>

        {/* Role Name */}
        <div className="mb-5">
          <label className={labelClass}>Role Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Editor, Moderator"
            className={inputClass}
          />
        </div>

        {/* Permissions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className={labelClass}>
              <Key className="inline w-3 h-3 mr-1 mb-0.5" />
              Permissions
            </label>
            {permissions.length > 0 && (
              <button
                onClick={toggleAll}
                className="text-xs font-medium transition-colors text-[#029bd2] hover:text-[#1a4468] dark:hover:text-[#029bd2]/70"
              >
                {selected.length === permissions.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            )}
          </div>

          <div
            className={`rounded-xl border overflow-hidden ${
              isAdminDark ? "border-zinc-700" : "border-zinc-200"
            }`}
          >
            {permissions.length === 0 ? (
              <p
                className={`text-xs text-center py-5 ${
                  isAdminDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                No permissions available
              </p>
            ) : (
              <div className="max-h-48 overflow-y-auto admin-scrollbar">
                {permissions.map((p, i) => {
                  const isChecked = selected.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      onClick={() => togglePermission(p.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 ${
                        i !== permissions.length - 1
                          ? isAdminDark
                            ? "border-b border-zinc-800"
                            : "border-b border-zinc-100"
                          : ""
                      } ${
                        isChecked
                          ? isAdminDark
                            ? "bg-[#029bd2]/10"
                            : "bg-[#029bd2]/5"
                          : isAdminDark
                          ? "hover:bg-zinc-800"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={() => togglePermission(p.id)}
                      />
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 flex-shrink-0 text-[#029bd2]" />
                      ) : (
                        <Square
                          className={`w-4 h-4 flex-shrink-0 ${
                            isAdminDark ? "text-zinc-600" : "text-zinc-300"
                          }`}
                        />
                      )}
                      <span
                        className={`text-sm ${
                          isChecked
                            ? "text-[#029bd2] font-medium"
                            : isAdminDark
                            ? "text-zinc-300"
                            : "text-zinc-700"
                        }`}
                      >
                        {p.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {selected.length > 0 && (
            <p
              className={`text-xs mt-2 ${
                isAdminDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              {selected.length} permission{selected.length > 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className={`h-px mb-5 ${
            isAdminDark ? "bg-zinc-800" : "bg-zinc-100"
          }`}
        />

        {/* Submit */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-md
            ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.01] active:scale-[0.99] hover:shadow-[#1a4468]/30"
            }`}
          style={{
            background: loading
              ? "#029bd2"
              : "linear-gradient(135deg, #1a4468 0%, #029bd2 100%)",
          }}
        >
          {loading ? (
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            <ShieldPlus className="w-4 h-4" />
          )}
          {loading ? "Creating..." : "Save Role"}
        </button>
      </motion.div>

      {/* ── RIGHT: Existing Roles Grid ───────────────────────── */}
      <motion.div
        className="flex-1 min-w-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield
              className={`w-4 h-4 ${
                isAdminDark ? "text-[#029bd2]" : "text-[#1a4468]"
              }`}
            />
            <h2
              className={`text-base font-semibold ${
                isAdminDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              All Roles
            </h2>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              isAdminDark
                ? "bg-[#029bd2]/10 text-[#029bd2]"
                : "bg-[#1a4468]/10 text-[#1a4468]"
            }`}
          >
            {roles.length} role{roles.length !== 1 ? "s" : ""}
          </span>
        </div>

        {roles.length === 0 ? (
          <div
            className={`rounded-2xl border border-dashed flex flex-col items-center justify-center py-16 ${
              isAdminDark
                ? "border-zinc-700 text-zinc-600"
                : "border-zinc-300 text-zinc-400"
            }`}
          >
            <Shield className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No roles created yet</p>
            <p className="text-xs mt-1 opacity-70">
              Create your first role using the form
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {roles.map((role, idx) => {
                const isExpanded = expandedRole === role.id;
                const perms = role.permissions || role.Permissions || [];

                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
                      isAdminDark
                        ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-100 hover:border-zinc-200 shadow-sm"
                    }`}
                  >
                    {/* Role header row */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Gradient icon */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, #1a4468 0%, #029bd2 100%)",
                          }}
                        >
                          {role.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold truncate ${
                              isAdminDark ? "text-zinc-100" : "text-zinc-800"
                            }`}
                          >
                            {role.name}
                          </p>
                          <p
                            className={`text-xs ${
                              isAdminDark ? "text-zinc-500" : "text-zinc-400"
                            }`}
                          >
                            {perms.length} permission
                            {perms.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {perms.length > 0 && (
                          <button
                            onClick={() =>
                              setExpandedRole(isExpanded ? null : role.id)
                            }
                            className={`p-1.5 rounded-lg transition-colors ${
                              isAdminDark
                                ? "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                                : "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600"
                            }`}
                            title={
                              isExpanded ? "Collapse" : "View permissions"
                            }
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable permissions */}
                    <AnimatePresence>
                      {isExpanded && perms.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`px-4 pb-3 border-t ${
                              isAdminDark
                                ? "border-zinc-800"
                                : "border-zinc-100"
                            }`}
                          >
                            <div className="flex flex-wrap gap-1.5 pt-3">
                              {perms.map((perm) => (
                                <span
                                  key={perm.id}
                                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                    isAdminDark
                                      ? "bg-[#029bd2]/10 text-[#029bd2]"
                                      : "bg-[#1a4468]/8 text-[#1a4468]"
                                  }`}
                                >
                                  {perm.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
