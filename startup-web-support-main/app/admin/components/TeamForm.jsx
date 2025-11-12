"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import teamService from "@/services/team.service";
import CommonServices from "@/services/common.service";

export default function TeamForm({ selected, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    position: "",
    description: "",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selected) {
      setFormData(selected);
      setPreview(selected.image || "");
    }
  }, [selected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🖼 Handle file upload via CommonServices
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await CommonServices.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: uploaded.url }));
      setPreview(uploaded.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await teamService.update(selected.id, formData);
        toast.success("Team member updated successfully");
      } else {
        await teamService.create(formData);
        toast.success("Team member added successfully");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving team member");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image upload and preview */}
      <div>
        <Label>Image</Label>
        <div className="flex items-center gap-3">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && (
            <span className="text-sm text-gray-500">Uploading...</span>
          )}
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 h-32 w-full object-cover rounded-lg border"
          />
        )}
      </div>

      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Position</Label>
        <Input
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={uploading}>
        {selected ? "Update" : "Add"} Member
      </Button>
    </form>
  );
}
