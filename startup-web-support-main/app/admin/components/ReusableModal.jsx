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

import { ADD_BUTTON_CLASS } from "@/constants";

export default function ReusableModal({
  title,
  triggerLabel = "",
  triggerClassName = ADD_BUTTON_CLASS,
  children,
  open: controlledOpen,
  onOpenChange,
  fullScreen = false,
  maxWidth = "max-w-lg",
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerLabel && (
        <DialogTrigger asChild>
          <Button className={triggerClassName}>{triggerLabel}</Button>
        </DialogTrigger>
      )}

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`${fullScreen
            ? "!w-screen !h-screen !max-w-none !max-h-none rounded-none p-0 m-0 !inset-0 !translate-x-0 !translate-y-0 overflow-y-auto admin-scrollbar"
            : `${maxWidth} rounded-xl shadow-xl max-h-[90vh] overflow-y-auto admin-scrollbar`
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
