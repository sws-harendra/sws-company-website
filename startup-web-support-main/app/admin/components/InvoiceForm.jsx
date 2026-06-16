"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADD_BUTTON_CLASS } from "@/constants";
import { toast } from "sonner";

export default function InvoiceForm({ selected, onSave, onCancel }) {
  const [form, setForm] = useState(
    selected || {
      name: "",
      companyName: "",
      number: "",
      gstNumber: "",
      address: "",
      email: "",
      gst: "",
      discount: "",
      services: [{ description: "", amount: "", hsnCode: "" }],
      payments: [{ modeOfPayment: "", receivedAmount: "", paymentDate: "" }],
    },
  );
  useEffect(() => {
    console.log(selected);
    if (selected) {
      setForm(selected);
    }
  }, [selected]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (type, index, key, value) => {
    const updated = form[type].map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    setForm({ ...form, [type]: updated });
  };

  const addRow = (type) => {
    const defaults = {
      services: { description: "", amount: "", hsnCode: "" },
      payments: { modeOfPayment: "", receivedAmount: "", paymentDate: "" },
    };
    setForm({ ...form, [type]: [...form[type], defaults[type]] });
  };

  const removeRow = (type, index) => {
    setForm({
      ...form,
      [type]: form[type].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Client Name is required to save the invoice");
      return;
    }
    onSave(form);
  };
  const INPUT_CLASS = "h-12 px-4 text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-3 md:p-4 space-y-4">
          <h3 className="font-semibold">Client Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Client Name"
              value={form.name}
              className={INPUT_CLASS}
              onChange={handleChange}
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
            <Input
              name="number"
              placeholder="Phone Number"
              value={form.number}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
            <Input
              name="gstNumber"
              placeholder="GST Number"
              value={form.gstNumber}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
            <Input
              name="gst"
              placeholder="GST percentage"
              value={form.gst}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className={INPUT_CLASS}
            />{" "}
            <Input
              name="discount"
              placeholder="Discount"
              value={form.discount}
              onChange={handleChange}
              className={INPUT_CLASS}
            />
          </div>
        </CardContent>
      </Card>

      {/* SERVICES */}
      <Card>
        <CardContent className="p-3 md:p-4 space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">Services</h3>
            <Button
              type="button"
              className={ADD_BUTTON_CLASS}
              onClick={() => addRow("services")}
            >
              + Add Service
            </Button>
          </div>
          {form?.services.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
            >
              <Input
                placeholder="Description"
                value={s.description}
                className={INPUT_CLASS}
                onChange={(e) =>
                  handleArrayChange(
                    "services",
                    i,
                    "description",
                    e.target.value,
                  )
                }
              />
              <Input
                placeholder="Amount"
                type="number"
                className={INPUT_CLASS}
                value={s.amount}
                onChange={(e) =>
                  handleArrayChange("services", i, "amount", e.target.value)
                }
              />
              <Input
                placeholder="HSN Code"
                value={s.hsnCode}
                className={INPUT_CLASS}
                onChange={(e) =>
                  handleArrayChange("services", i, "hsnCode", e.target.value)
                }
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeRow("services", i)}
              >
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PAYMENTS */}
      <Card>
        <CardContent className="p-3 md:p-4 space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">Payments</h3>
            <Button
              type="button"
              className={ADD_BUTTON_CLASS}
              onClick={() => addRow("payments")}
            >
              + Add Payment
            </Button>
          </div>
          {form.payments.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
            >
              <Select
                value={p.modeOfPayment}
                onValueChange={(value) =>
                  handleArrayChange("payments", i, "modeOfPayment", value)
                }
              >
                <SelectTrigger className="border border-gray-300 rounded-md h-[40px] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-0 bg-transparent">
                  <SelectValue placeholder="Select Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Received Amount"
                type="number"
                className={INPUT_CLASS}
                value={p.receivedAmount}
                onChange={(e) =>
                  handleArrayChange(
                    "payments",
                    i,
                    "receivedAmount",
                    e.target.value,
                  )
                }
              />
              <Input
                type="date"
                value={p.paymentDate}
                onChange={(e) =>
                  handleArrayChange(
                    "payments",
                    i,
                    "paymentDate",
                    e.target.value,
                  )
                }
                className="h-9 px-2 text-xs sm:text-sm"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeRow("payments", i)}
              >
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
