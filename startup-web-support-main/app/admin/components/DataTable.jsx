"use client";
import { motion } from "framer-motion";

export default function DataTable({ data, columns }) {
  if (!data?.length)
    return <p className="text-center py-4 text-gray-500">No records found</p>;

  return (
    <motion.table
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full border rounded-lg overflow-hidden shadow-sm text-sm"
    >
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 text-left font-medium">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col} className="px-4 py-2">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </motion.table>
  );
}
