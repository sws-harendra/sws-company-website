"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import ContactUs from "@/components/ContactUs";

export default function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Show popup once after 5 seconds of visit (exclude /admin)
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle ESC key press to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Contact and Consultation Popup"
    >
      <div
        className="relative w-full max-w-4xl my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <ContactUs
          page={pathname || "/"}
          showTitle={false}
          showClose={true}
          onClose={handleClose}
          showCtaSide={true}
        />
      </div>
    </div>
  );
}
