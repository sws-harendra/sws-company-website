"use client";
import { useEffect, useState } from "react";
import { RoleService } from "@/services/roleService";
import { UserService } from "@/services/userService";
import { motion } from "framer-motion";
import { useAdminTheme } from "../(main)/context/AdminThemeContext";
import { User, Mail, Lock, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserForm() {
  const { isAdminDark } = useAdminTheme();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    RoleService.getAll().then(setRoles);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields required");
      return;
    }
    setLoading(true);
    try {
      await UserService.create(form);
      toast.success("User created successfully!");
      setForm({ name: "", email: "", password: "", roleId: "" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-xl px-4 py-2.5 text-sm outline-none border transition-all duration-200 pl-10
    ${
      isAdminDark
        ? "bg-zinc-800/60 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-[#029bd2] focus:ring-1 focus:ring-[#029bd2]/40"
        : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-[#029bd2] focus:ring-1 focus:ring-[#029bd2]/30"
    }`;

  const labelClass = `text-xs font-semibold uppercase tracking-wide mb-1.5 block ${
    isAdminDark ? "text-zinc-400" : "text-zinc-500"
  }`;

  const iconClass = `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
    isAdminDark ? "text-zinc-500" : "text-zinc-400"
  }`;

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg w-full max-w-lg border transition-colors duration-300 ${
        isAdminDark
          ? "bg-zinc-900 border-zinc-800"
          : "bg-white border-zinc-100"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-2.5 rounded-xl ${
            isAdminDark
              ? "bg-[#029bd2]/10 border border-[#029bd2]/20"
              : "bg-[#029bd2]/10 border border-[#029bd2]/20"
          }`}
        >
          <UserPlus className="w-5 h-5 text-[#029bd2]" />
        </div>
        <div>
          <h2
            className={`text-base font-semibold ${
              isAdminDark ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            Create User
          </h2>
          <p
            className={`text-xs ${
              isAdminDark ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Add a new user to the system
          </p>
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className={labelClass}>Full Name</label>
        <div className="relative">
          <User className={iconClass} />
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className={labelClass}>Email Address</label>
        <div className="relative">
          <Mail className={iconClass} />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className={labelClass}>Password</label>
        <div className="relative">
          <Lock className={iconClass} />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
      </div>

      {/* Role */}
      <div className="mb-6">
        <label className={labelClass}>Assign Role</label>
        <div className="relative">
          <ShieldCheck className={`${iconClass} z-10 pointer-events-none`} />
          <Select
            value={form.roleId}
            onValueChange={(value) => setForm({ ...form, roleId: value })}
          >
            <SelectTrigger className={`${inputClass} appearance-none cursor-pointer h-[42px]`}>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`h-px mb-5 ${
          isAdminDark ? "bg-zinc-800" : "bg-zinc-100"
        }`}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-white shadow-md
          ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99] hover:shadow-[#029bd2]/30"}
        `}
        style={{
          background: loading
            ? "#1a4468"
            : "linear-gradient(135deg, #029bd2 0%, #1a4468 100%)",
        }}
      >
        {loading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          <UserPlus className="w-4 h-4" />
        )}
        {loading ? "Creating..." : "Save User"}
      </button>
    </motion.div>
  );
}
