"use client";
import { useState, useEffect } from "react";
import { RoleService } from "@/services/roleService";
import { PermissionService } from "@/services/permissionService";
import { motion } from "framer-motion";

export default function RoleForm() {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    PermissionService.getAll().then(setPermissions);
  }, []);

  const handleCreate = async () => {
    if (!name) return alert("Role name required");
    const role = await RoleService.create({ name });
    if (selected.length) {
      await RoleService.assignPermissions({
        roleId: role.id,
        permissionIds: selected,
      });
    }
    alert("Role created successfully!");
    setName("");
    setSelected([]);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-lg font-semibold mb-4">Create Role</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Role name"
        className="w-full border rounded-lg p-2 mb-3"
      />

      <div className="flex flex-col space-y-1 mb-4">
        <p className="text-sm text-gray-600 mb-2">Select Permissions</p>
        {permissions.map((p) => (
          <label key={p.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() =>
                setSelected((prev) =>
                  prev.includes(p.id)
                    ? prev.filter((id) => id !== p.id)
                    : [...prev, p.id]
                )
              }
            />
            <span>{p.name}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Save Role
      </button>
    </motion.div>
  );
}
