"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold dark:text-zinc-100">{title}</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end mt-6">
          <Button variant="outline" onClick={onClose} className="rounded-lg dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            {cancelText}
          </Button>
          <Button variant={variant} onClick={() => {
            onConfirm();
            onClose();
          }} className="rounded-lg">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
