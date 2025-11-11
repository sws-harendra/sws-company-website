"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Printer } from "lucide-react";
import InvoiceForm from "../../components/InvoiceForm";
import invoiceService from "@/services/invoice.service";
import ReusableModal from "../../components/ReusableModal";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [editData, setEditData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  const fetchInvoices = async () => {
    const data = await invoiceService.getAll({ page: 1, limit: 20 });
    setInvoices(data.invoices || []);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this invoice?")) return;
    await invoiceService.remove(id);
    fetchInvoices();
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
        alert("No history available for this invoice.");
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>

        <ReusableModal
          title="Create Invoice"
          triggerLabel="+ New Invoice"
          fullScreen="true"
        >
          {({ close }) => (
            <InvoiceForm
              onSave={(form) => handleSave(form, close)}
              onCancel={close}
            />
          )}
        </ReusableModal>
      </div>

      <div className="grid gap-4">
        {invoices.length === 0 && (
          <p className="text-gray-500 text-sm">No invoices found yet.</p>
        )}

        {invoices.map((inv) => (
          <Card key={inv.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{inv.code}</h2>
                <p className="text-sm text-gray-600">
                  {inv.name} — {inv.companyName}
                </p>
                <p className="text-xs text-gray-400">
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
                  onClick={() => handleDelete(inv.id)}
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
          title={`Edit Invoice ${editData.code}`}
          triggerLabel=""
          open={!!editData}
          fullScreen={true}
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
          title={`Invoice History: ${historyData.code}`}
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
                  className="border rounded-lg p-3 bg-gray-50 text-sm"
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
                  <p className="text-gray-600">
                    <strong>Customer:</strong> {snap.name} ({snap.companyName})
                  </p>
                  <p className="text-gray-600">
                    <strong>GST:</strong> {snap.gstNumber || "—"}
                  </p>
                  <div className="mt-2">
                    <strong>Services:</strong>
                    <ul className="list-disc pl-5 text-gray-700">
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
    </div>
  );
}
