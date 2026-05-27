"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ImageIcon, UploadCloud } from "lucide-react";
import CommonServices from "@/services/common.service";
import { toast } from "sonner";

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
      setForm({
        ...initialData,
        bannerImage: initialData.bannerImage || initialData.image_url || ""
      });
      setPreview(initialData.bannerImage || initialData.image_url || "");
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
      const uploaded = await CommonServices.uploadImage(file);
      setForm((prev) => ({ ...prev, bannerImage: uploaded.url }));
      setPreview(uploaded.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
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
      className="p-5 space-y-4 border rounded-2xl bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-md text-zinc-900 dark:text-zinc-100 transition-all duration-300"
    >
      {/* Compact Image Upload Casing (w-28 h-28 preserved exactly as original size) */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Banner Image
        </Label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 w-28 h-28 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-[#029bd2]/50 hover:bg-[#029bd2]/5 dark:hover:bg-[#029bd2]/5 transition-all duration-300 select-none group">
            {uploading ? (
              <Loader2 className="animate-spin text-[#029bd2] w-5 h-5" />
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-500 group-hover:text-[#029bd2] transition-colors">
                <UploadCloud className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
              </div>
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
              className="h-8 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/5 dark:hover:bg-rose-500/5 rounded-lg text-xs cursor-pointer transition-all active:scale-95"
            >
              Remove Image
            </Button>
          )}
        </div>
      </div>

      {/* Copywriting Fields */}
      <div className="space-y-3.5">
        <div className="space-y-1">
          <Label htmlFor="title" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Banner Title"
            value={form.title}
            onChange={handleChange}
            required
            className="pl-4 h-11 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none mt-1 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Banner Description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            className="pl-4 py-2.5 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none mt-1 resize-none text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Action CTA Buttons Fields */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Button 1 (Primary CTA)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="button1_title"
              placeholder="Button 1 Title"
              value={form.button1_title}
              onChange={handleChange}
              className="pl-4 h-11 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none text-zinc-900 dark:text-white"
            />
            <Input
              name="button1_url"
              placeholder="Button 1 URL"
              value={form.button1_url}
              onChange={handleChange}
              className="pl-4 h-11 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Button 2 (Secondary CTA)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="button2_title"
              placeholder="Button 2 Title"
              value={form.button2_title}
              onChange={handleChange}
              className="pl-4 h-11 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none text-zinc-900 dark:text-white"
            />
            <Input
              name="button2_url"
              placeholder="Button 2 URL"
              value={form.button2_url}
              onChange={handleChange}
              className="pl-4 h-11 border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 rounded-xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none text-zinc-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Action Footer Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="h-11 px-5 border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-xl text-sm font-semibold cursor-pointer transition-all active:scale-95 text-zinc-700 dark:text-zinc-300"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={uploading}
          className="h-11 px-6 bg-gradient-to-r from-[#1a4468] via-[#102d45] to-[#029bd2] hover:opacity-95 text-white font-bold rounded-xl shadow-md text-sm cursor-pointer transition-all active:scale-95"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4 text-white" />
              <span>Saving Assets...</span>
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
}
