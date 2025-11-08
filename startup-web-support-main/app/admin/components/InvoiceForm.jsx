"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function InvoiceForm({ selected, onSave, onCancel }) {
  const [form, setForm] = useState(
    selected || {
      name: "",
      companyName: "",
      number: "",
      gstNumber: "",
      address: "",
      email: "",
      discount: 0,
      services: [{ description: "", amount: "", hsnCode: "" }],
      payments: [{ modeOfPayment: "", receivedAmount: "", paymentDate: "" }],
      details: [
        { gstNumber: "", accountNumber: "", ifsc: "", accountName: "" },
      ],
    }
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
      i === index ? { ...item, [key]: value } : item
    );
    setForm({ ...form, [type]: updated });
  };

  const addRow = (type) => {
    const defaults = {
      services: { description: "", amount: "", hsnCode: "" },
      payments: { modeOfPayment: "", receivedAmount: "", paymentDate: "" },
      details: { gstNumber: "", accountNumber: "", ifsc: "", accountName: "" },
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
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Client Name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
            />
            <Input
              name="number"
              placeholder="Phone Number"
              value={form.number}
              onChange={handleChange}
            />
            <Input
              name="gstNumber"
              placeholder="GST Number"
              value={form.gstNumber}
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <Input
            name="discount"
            placeholder="Discount"
            value={form.discount}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* SERVICES */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">Services</h3>
            <Button type="button" onClick={() => addRow("services")}>
              + Add Service
            </Button>
          </div>
          {form?.services.map((s, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Description"
                value={s.description}
                onChange={(e) =>
                  handleArrayChange(
                    "services",
                    i,
                    "description",
                    e.target.value
                  )
                }
              />
              <Input
                placeholder="Amount"
                type="number"
                value={s.amount}
                onChange={(e) =>
                  handleArrayChange("services", i, "amount", e.target.value)
                }
              />
              <Input
                placeholder="HSN Code"
                value={s.hsnCode}
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
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">Payments</h3>
            <Button type="button" onClick={() => addRow("payments")}>
              + Add Payment
            </Button>
          </div>
          {form.payments.map((p, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Mode (e.g. UPI)"
                value={p.modeOfPayment}
                onChange={(e) =>
                  handleArrayChange(
                    "payments",
                    i,
                    "modeOfPayment",
                    e.target.value
                  )
                }
              />
              <Input
                placeholder="Received Amount"
                type="number"
                value={p.receivedAmount}
                onChange={(e) =>
                  handleArrayChange(
                    "payments",
                    i,
                    "receivedAmount",
                    e.target.value
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
                    e.target.value
                  )
                }
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

      {/* DETAILS */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">Bank / GST Details</h3>
            <Button type="button" onClick={() => addRow("details")}>
              + Add Detail
            </Button>
          </div>
          {form.details.map((d, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              <Input
                placeholder="GST Number"
                value={d.gstNumber}
                onChange={(e) =>
                  handleArrayChange("details", i, "gstNumber", e.target.value)
                }
              />
              <Input
                placeholder="Account Number"
                value={d.accountNumber}
                onChange={(e) =>
                  handleArrayChange(
                    "details",
                    i,
                    "accountNumber",
                    e.target.value
                  )
                }
              />
              <Input
                placeholder="IFSC"
                value={d.ifsc}
                onChange={(e) =>
                  handleArrayChange("details", i, "ifsc", e.target.value)
                }
              />
              <Input
                placeholder="Account Name"
                value={d.accountName}
                onChange={(e) =>
                  handleArrayChange("details", i, "accountName", e.target.value)
                }
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeRow("details", i)}
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
