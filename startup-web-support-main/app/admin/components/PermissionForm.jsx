"use client";
import { useState } from "react";
import { PermissionService } from "@/services/permissionService";
import { motion } from "framer-motion";

export default function PermissionForm() {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSubmit = async () => {
    if (!form.name) return alert("Permission name required");
    await PermissionService.create(form);
    alert("Permission created successfully!");
    setForm({ name: "", description: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Create Permission</h2>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Permission name"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <input
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Save Permission
      </button>
    </motion.div>
  );
}
