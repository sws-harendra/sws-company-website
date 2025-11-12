"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ContactUs from "@/components/ContactUs";

export default function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 🧭 Show popup on each page navigation
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      {/* No background at all — transparent */}
      <div className="pointer-events-auto">
        <ContactUs
          page={pathname}
          showTitle={false}
          showClose
          onClose={() => setOpen(false)}
          // ✅ Transparent popup container
          className="relative bg-transparent border-none shadow-none"
          style={{ maxWidth: "700px", width: "90vw" }}
        />
      </div>
    </div>
  );
}
