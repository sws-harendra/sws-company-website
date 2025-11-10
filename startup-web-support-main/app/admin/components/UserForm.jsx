"use client";
import { useEffect, useState } from "react";
import { RoleService } from "@/services/roleService";
import { UserService } from "@/services/userService";
import { motion } from "framer-motion";

export default function UserForm() {
  const [roles, setRoles] = useState([]);
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
    if (!form.name || !form.email || !form.password)
      return alert("All fields required");
    await UserService.create(form);
    alert("User created successfully!");
    setForm({ name: "", email: "", password: "", roleId: "" });
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold mb-4">Create User</h2>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
        className="w-full border rounded-lg p-2 mb-3"
      />
      <select
        value={form.roleId}
        onChange={(e) => setForm({ ...form, roleId: e.target.value })}
        className="w-full border rounded-lg p-2 mb-3"
      >
        <option value="">Select Role</option>
        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Save User
      </button>
    </motion.div>
  );
}
