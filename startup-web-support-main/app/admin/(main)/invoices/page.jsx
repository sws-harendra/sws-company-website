"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Printer } from "lucide-react";
import InvoiceForm from "../../components/InvoiceForm";
import invoiceService from "@/services/invoice.service";
import ReusableModal from "../../components/ReusableModal";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "sonner";
import InvoiceSettingsModal from "./components/InvoiceSettingsModal";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [editData, setEditData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchInvoices = async () => {
    const data = await invoiceService.getAll({ page: 1, limit: 20 });
    setInvoices(data.invoices || []);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await invoiceService.remove(deleteId);
      toast.success("Invoice deleted successfully");
      setDeleteId(null);
      fetchInvoices();
    }
  };

  const handleSave = async (form, close) => {
    try {
      if (editData) await invoiceService.update(editData.id, form);
      else await invoiceService.create(form);
      close();
      setEditData(null);
      fetchInvoices();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleViewHistory = async (invoiceId) => {
    try {
      const res = await invoiceService.getById(invoiceId, {
        includeHistory: true,
      });
      if (res.histories && res.histories.length > 0) {
        setHistoryData(res);
      } else {
        toast.error("No history available for this invoice.");
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>

        <div className="flex gap-4">
          <InvoiceSettingsModal />
          <ReusableModal
            title="Create Invoice"
            triggerLabel="+ New Invoice"
            maxWidth="max-w-5xl"
          >
            {({ close }) => (
              <InvoiceForm
                onSave={(form) => handleSave(form, close)}
                onCancel={close}
              />
            )}
          </ReusableModal>
        </div>
      </div>

      <div className="grid gap-4">
        {invoices.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">No invoices found yet.</p>
        )}

        {invoices.map((inv) => (
          <Card key={inv.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{inv.invoiceId}</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {inv.name} — {inv.companyName}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Total ₹{inv.totalAmount} | Received ₹{inv.totalReceived} | Due
                  ₹{inv.dueAmount}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => invoiceService.download(inv.id)} // ✅ correct
                  title="Download"
                >
                  <Printer className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleViewHistory(inv.id)}
                  title="View History"
                >
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setEditData(inv)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(inv.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editData && (
        <ReusableModal
          title={`Edit Invoice ${editData.invoiceId}`}
          triggerLabel=""
          open={!!editData}
          maxWidth="max-w-5xl"
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditData(null);
          }}
        >
          {({ close }) => (
            <InvoiceForm
              selected={editData}
              onSave={(form) => handleSave(form, close)}
              onCancel={() => {
                close();
                setEditData(null);
              }}
            />
          )}
        </ReusableModal>
      )}

      {/* History Modal */}
      {/* History Modal */}
      {historyData && (
        <ReusableModal
          title={`Invoice History: ${historyData.invoiceId}`}
          triggerLabel=""
          open={!!historyData}
          onOpenChange={(isOpen) => {
            if (!isOpen) setHistoryData(null);
          }}
        >
          <div className="p-4 space-y-3">
            {historyData.histories.map((h, i) => {
              const snap = h.snapshot || {};
              return (
                <div
                  key={i}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-zinc-50 dark:bg-zinc-900/50 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(h.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Version:</strong> {h.version}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{snap.totalAmount} |{" "}
                    <strong>Received:</strong> ₹{snap.totalReceived} |{" "}
                    <strong>Due:</strong> ₹{snap.dueAmount}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    <strong>Customer:</strong> {snap.name} ({snap.companyName})
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    <strong>GST:</strong> {snap.gstNumber || "—"}
                  </p>
                  <div className="mt-2">
                    <strong>Services:</strong>
                    <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                      {snap.services?.map((s, idx) => (
                        <li key={idx}>
                          {s.description} — ₹{s.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </ReusableModal>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Invoice"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
      />
    </div>
  );
}
