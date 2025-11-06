"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ReusableModal({
  title,
  triggerLabel = "Open Modal",
  children,
  open: controlledOpen,
  onOpenChange,
  fullScreen = false,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button>{triggerLabel}</Button>
        </DialogTrigger>
      )}

      <DialogContent
        className={`${
          fullScreen
            ? "!w-screen !h-screen !max-w-none !max-h-none rounded-none p-0 m-0 !inset-0 !translate-x-0 !translate-y-0 overflow-y-auto"
            : "max-w-lg rounded-2xl shadow-xl"
        }`}
      >
        {!fullScreen && (
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className={`${fullScreen ? "h-full w-full p-4" : "mt-4"}`}>
          {typeof children === "function"
            ? children({ close: handleClose })
            : children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
