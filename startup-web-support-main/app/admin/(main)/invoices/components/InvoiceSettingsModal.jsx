"use client";

import { useState, useEffect } from "react";
import ReusableModal from "@/app/admin/components/ReusableModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { ADD_BUTTON_CLASS, API_URL } from "@/constants";

export default function InvoiceSettingsModal() {
  const [form, setForm] = useState({
    gstNumber: "",
    accountNumber: "",
    ifsc: "",
    accountName: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      fetchSettings();
    }
  }, [open]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/invoice-settings`);
      if (res.data) {
        setForm({
          gstNumber: res.data.gstNumber || "",
          accountNumber: res.data.accountNumber || "",
          ifsc: res.data.ifsc || "",
          accountName: res.data.accountName || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (closeModal) => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/invoice-settings`, form);
      toast.success("Invoice settings updated globally!");
      closeModal();
    } catch (error) {
      console.error("Failed to update settings", error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReusableModal
      title="Global Invoice Settings"
      triggerLabel="Invoice Settings"
      triggerClassName={ADD_BUTTON_CLASS}
      open={open}
      onOpenChange={setOpen}
    >
      {({ close }) => (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            These details will be used automatically for all new and downloaded invoices.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">GST Number</label>
              <Input
                name="gstNumber"
                placeholder="GST Number"
                value={form.gstNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Account Name</label>
              <Input
                name="accountName"
                placeholder="Account Name"
                value={form.accountName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Account Number</label>
              <Input
                name="accountNumber"
                placeholder="Account Number"
                value={form.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium">IFSC Code</label>
              <Input
                name="ifsc"
                placeholder="IFSC Code"
                value={form.ifsc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={close} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={() => handleSave(close)} disabled={loading}>
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      )}
    </ReusableModal>
  );
}
