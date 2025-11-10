"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TestimonialForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    client_name: initialData.client_name || "",
    client_position: initialData.client_position || "",
    text: initialData.text || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Client Name */}
      <div className="space-y-2">
        <Label htmlFor="client_name">Client Name</Label>
        <Input
          id="client_name"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          placeholder="Enter client name"
          required
        />
      </div>

      {/* Position */}
      <div className="space-y-2">
        <Label htmlFor="client_position">Client Position</Label>
        <Input
          id="client_position"
          name="client_position"
          value={formData.client_position}
          onChange={handleChange}
          placeholder="e.g. CEO, Company Name"
        />
      </div>

      {/* Testimonial Text */}
      <div className="space-y-2">
        <Label htmlFor="text">Testimonial</Label>
        <Textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Enter testimonial text"
          rows={4}
          required
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Testimonial"}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
