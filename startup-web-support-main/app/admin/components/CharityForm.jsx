"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CommonServices from "@/services/common.service";
import { 
  Upload, 
  Trash2, 
  Video, 
  Image as ImageIcon, 
  Loader2, 
  Play
} from "lucide-react";
import { toast } from "sonner";

export default function CharityForm({ onSave, initialData = {}, onCancel }) {
  const isInitialVideo = (initialData.redirect_url || initialData.image_url || "").match(
    /\.(mp4|webm)|youtube|youtu\.be|vimeo/i
  );

  const [mediaType, setMediaType] = useState(isInitialVideo ? "video" : "photo");

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    image_url: initialData.image_url || "",
    redirect_url: initialData.redirect_url || "", // Holds video URL if external video
    description: initialData.description || "",
    location: initialData.location || "",
    date: initialData.date || "",
    category: "General",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await CommonServices.uploadImage(file);
      if (mediaType === "video" && file.type.startsWith("video/")) {
        setFormData((prev) => ({
          ...prev,
          image_url: response.url,
          redirect_url: response.url,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          image_url: response.url,
        }));
      }
      toast.success("Media uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload media file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!formData.image_url.trim()) {
      toast.error("Please provide or upload a photo or video");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        description: formData.description || formData.title,
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Media Type Switcher */}
      <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setMediaType("photo")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mediaType === "photo"
              ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Photo
        </button>
        <button
          type="button"
          onClick={() => setMediaType("video")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mediaType === "video"
              ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
          }`}
        >
          <Video className="w-4 h-4" />
          Video (YouTube / MP4)
        </button>
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-sm font-semibold">
          Title <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Food Distribution in Slum Area, Winter Warmth Drive..."
          required
          className="rounded-lg"
        />
      </div>

      {/* Media Upload / URL */}
      <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold flex items-center gap-2">
            {mediaType === "photo" ? (
              <ImageIcon className="w-4 h-4 text-rose-500" />
            ) : (
              <Video className="w-4 h-4 text-rose-500" />
            )}
            {mediaType === "photo" ? "Upload Photo" : "Upload Video or Video Thumbnail"}
          </Label>
          {formData.image_url && (
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, image_url: "", redirect_url: "" }))}
              className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>

        {formData.image_url ? (
          <div className="relative w-full h-44 rounded-lg overflow-hidden border bg-zinc-900">
            {mediaType === "video" && formData.redirect_url?.includes("youtube") ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white gap-2">
                <Play className="w-8 h-8 text-rose-500" />
                <span className="text-xs text-zinc-300">YouTube Video Linked</span>
              </div>
            ) : (
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
            <input
              type="file"
              id="media_file_input"
              accept={mediaType === "photo" ? "image/*" : "image/*,video/*"}
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <label
              htmlFor="media_file_input"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                  <span className="text-xs text-muted-foreground mt-2">Uploading...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-7 h-7 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Click to choose {mediaType === "photo" ? "photo file" : "video/thumbnail"}
                  </span>
                  <span className="text-xs text-muted-foreground">PNG, JPG, WebP, MP4</span>
                </>
              )}
            </label>
          </div>
        )}

        <div className="space-y-1 pt-1">
          <Label htmlFor="image_url" className="text-xs text-muted-foreground">
            {mediaType === "photo" ? "Or Photo URL:" : "Photo / Thumbnail URL:"}
          </Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="text-xs h-8"
          />
        </div>

        {mediaType === "video" && (
          <div className="space-y-1 pt-1">
            <Label htmlFor="redirect_url" className="text-xs text-muted-foreground">
              YouTube Video Link / Video URL:
            </Label>
            <Input
              id="redirect_url"
              name="redirect_url"
              value={formData.redirect_url}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  redirect_url: val,
                  // If YouTube and no image_url set, grab YouTube thumbnail
                  image_url:
                    prev.image_url ||
                    (val.includes("youtu.be/")
                      ? `https://img.youtube.com/vi/${val.split("youtu.be/")[1]?.split("?")[0]}/hqdefault.jpg`
                      : val.includes("watch?v=")
                      ? `https://img.youtube.com/vi/${val.split("watch?v=")[1]?.split("&")[0]}/hqdefault.jpg`
                      : ""),
                }));
              }}
              placeholder="https://www.youtube.com/watch?v=... or direct video link"
              className="text-xs h-8"
            />
          </div>
        )}
      </div>

      {/* Description / Story */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-sm font-semibold">
          Details / Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Brief details about this charity activity, who was helped, location highlights..."
          className="rounded-lg"
        />
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs font-semibold">
            Location (Optional)
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Patna, Bihar"
            className="rounded-lg h-9 text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="date" className="text-xs font-semibold">
            Date (Optional)
          </Label>
          <Input
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="e.g., Nov 2026"
            className="rounded-lg h-9 text-xs"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Media"
          )}
        </Button>
      </div>
    </form>
  );
}
