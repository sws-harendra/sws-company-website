"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ImageIcon } from "lucide-react";
import CommonServices from "@/services/common.service";
export default function BannerForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    bannerImage: "",
    title: "",
    description: "",
    button1_title: "",
    button1_url: "",
    button2_title: "",
    button2_url: "",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.bannerImage || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await CommonServices.uploadImage(file); // expects { path: "/uploads/file.png" }
      setForm((prev) => ({ ...prev, bannerImage: uploaded.url }));
      console.log(uploaded);
      setPreview(uploaded.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-3 border rounded-lg bg-white shadow-sm"
    >
      {/* Image Upload */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Banner Image</Label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center justify-center border w-28 h-28 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition">
            {uploading ? (
              <Loader2 className="animate-spin text-gray-500" />
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="text-gray-400" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {preview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setPreview("");
                setForm((prev) => ({ ...prev, bannerImage: "" }));
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          name="button1_title"
          placeholder="Button 1 Title"
          value={form.button1_title}
          onChange={handleChange}
        />
        <Input
          name="button1_url"
          placeholder="Button 1 URL"
          value={form.button1_url}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          name="button2_title"
          placeholder="Button 2 Title"
          value={form.button2_title}
          onChange={handleChange}
        />
        <Input
          name="button2_url"
          placeholder="Button 2 URL"
          value={form.button2_url}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Uploading...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
}
