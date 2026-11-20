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
  Play,
  CheckCircle2,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  checkIsVideo,
  isVideoFile,
  getYouTubeVideoId,
  getYouTubeThumbnail,
} from "@/lib/videoUtils";

export default function CharityForm({ onSave, initialData = {}, onCancel }) {
  const isInitialVideo = Boolean(
    (initialData.redirect_url && checkIsVideo(initialData.redirect_url)) ||
    (initialData.image_url && checkIsVideo(initialData.image_url))
  );

  const [mediaType, setMediaType] = useState(
    isInitialVideo ? "video" : "photo"
  );

  // Parse initial URLs
  let initVideoUrl = "";
  let initThumbnailUrl = "";
  let initPhotoUrl = "";

  if (isInitialVideo) {
    if (initialData.redirect_url && checkIsVideo(initialData.redirect_url)) {
      initVideoUrl = initialData.redirect_url;
      if (initialData.image_url && !isVideoFile(initialData.image_url)) {
        initThumbnailUrl = initialData.image_url;
      }
    } else if (initialData.image_url && isVideoFile(initialData.image_url)) {
      initVideoUrl = initialData.image_url;
      initThumbnailUrl = "";
    } else if (initialData.image_url && checkIsVideo(initialData.image_url)) {
      initVideoUrl = initialData.image_url;
      initThumbnailUrl = "";
    }
  } else {
    initPhotoUrl = initialData.image_url || "";
  }

  const [photoUrl, setPhotoUrl] = useState(initPhotoUrl);
  const [videoUrl, setVideoUrl] = useState(initVideoUrl);
  const [thumbnailUrl, setThumbnailUrl] = useState(initThumbnailUrl);

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    location: initialData.location || "",
    date: initialData.date || "",
    category: initialData.category || "General",
  });

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload main media (Photo or Video file)
  const handleMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const response = await CommonServices.uploadImage(file);
      if (mediaType === "video") {
        setVideoUrl(response.url);
        toast.success("Video uploaded successfully!");
      } else {
        setPhotoUrl(response.url);
        toast.success("Photo uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Upload custom thumbnail for video
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    try {
      const response = await CommonServices.uploadImage(file);
      setThumbnailUrl(response.url);
      toast.success("Video thumbnail uploaded successfully!");
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      toast.error("Failed to upload thumbnail image");
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  // Auto-detected YouTube thumbnail if available and no custom thumbnail is uploaded
  const detectedYouTubeThumb = getYouTubeThumbnail(videoUrl);
  const effectiveThumbnail =
    thumbnailUrl || (detectedYouTubeThumb ? detectedYouTubeThumb : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    let finalImageUrl = "";
    let finalRedirectUrl = "";

    if (mediaType === "photo") {
      if (!photoUrl.trim()) {
        toast.error("Please provide or upload a photo");
        return;
      }
      finalImageUrl = photoUrl.trim();
      finalRedirectUrl = "";
    } else {
      // Video
      if (!videoUrl.trim()) {
        toast.error("Please provide or upload a video");
        return;
      }
      finalRedirectUrl = videoUrl.trim();

      // If user uploaded or specified custom thumbnail, use it
      if (thumbnailUrl.trim()) {
        finalImageUrl = thumbnailUrl.trim();
      } else if (detectedYouTubeThumb) {
        // Fallback to YouTube auto thumbnail
        finalImageUrl = detectedYouTubeThumb;
      } else {
        // Fallback for direct video file without custom thumb
        finalImageUrl = videoUrl.trim();
      }
    }

    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        image_url: finalImageUrl,
        redirect_url: finalRedirectUrl,
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

      {/* PHOTO MODE */}
      {mediaType === "photo" && (
        <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-rose-500" />
              Upload Photo
            </Label>
            {photoUrl && (
              <button
                type="button"
                onClick={() => setPhotoUrl("")}
                className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>

          {photoUrl ? (
            <div className="relative w-full h-44 rounded-lg overflow-hidden border bg-zinc-900">
              <img
                src={photoUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
              <input
                type="file"
                id="photo_file_input"
                accept="image/*"
                onChange={handleMediaUpload}
                className="hidden"
                disabled={isUploadingMedia}
              />
              <label
                htmlFor="photo_file_input"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                {isUploadingMedia ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                    <span className="text-xs text-muted-foreground mt-2">
                      Uploading Photo...
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-7 h-7 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Click to choose photo file
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, WebP
                    </span>
                  </>
                )}
              </label>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <Label htmlFor="photo_url_input" className="text-xs text-muted-foreground">
              Or Photo URL:
            </Label>
            <Input
              id="photo_url_input"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="text-xs h-8"
            />
          </div>
        </div>
      )}

      {/* VIDEO MODE */}
      {mediaType === "video" && (
        <div className="space-y-4">
          {/* Section 1: Video File or Video URL */}
          <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-500" />
                Video Source (File or Link) <span className="text-rose-500">*</span>
              </Label>
              {videoUrl && (
                <button
                  type="button"
                  onClick={() => setVideoUrl("")}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Video
                </button>
              )}
            </div>

            {/* Video File Upload */}
            {!videoUrl ? (
              <div className="border-2 border-dashed rounded-lg p-5 text-center hover:border-rose-400 transition-colors">
                <input
                  type="file"
                  id="video_file_input"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  disabled={isUploadingMedia}
                />
                <label
                  htmlFor="video_file_input"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  {isUploadingMedia ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                      <span className="text-xs text-muted-foreground mt-2">
                        Uploading Video...
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Click to upload video file
                      </span>
                      <span className="text-xs text-muted-foreground">
                        MP4, WebM, MOV
                      </span>
                    </>
                  )}
                </label>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border bg-black p-2">
                {isVideoFile(videoUrl) ? (
                  <video
                    controls
                    src={videoUrl}
                    className="w-full max-h-44 rounded-md mx-auto"
                  />
                ) : getYouTubeVideoId(videoUrl) ? (
                  <div className="flex items-center gap-3 p-3 bg-zinc-900 text-white rounded-md">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-rose-400">
                        YouTube Video Attached
                      </p>
                      <p className="text-xs text-zinc-300 truncate">{videoUrl}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 text-xs text-zinc-200">
                    <Video className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate">{videoUrl}</span>
                  </div>
                )}
              </div>
            )}

            {/* Video URL Input */}
            <div className="space-y-1 pt-1">
              <Label htmlFor="video_url_input" className="text-xs text-muted-foreground">
                Or Video URL (YouTube, Vimeo, direct MP4 link):
              </Label>
              <Input
                id="video_url_input"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or direct video URL"
                className="text-xs h-8"
              />
            </div>
          </div>

          {/* Section 2: Video Thumbnail Upload (Option for thumbnail) */}
          <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-rose-100 dark:border-rose-950/40">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  Video Thumbnail (Cover Image)
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload a custom thumbnail image to show in the charity gallery.
                </p>
              </div>
              {thumbnailUrl && (
                <button
                  type="button"
                  onClick={() => setThumbnailUrl("")}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Custom
                </button>
              )}
            </div>

            {/* Thumbnail Preview */}
            {effectiveThumbnail ? (
              <div className="space-y-2">
                <div className="relative w-full h-44 rounded-lg overflow-hidden border bg-zinc-900">
                  <img
                    src={effectiveThumbnail}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {thumbnailUrl
                      ? "Custom Thumbnail Image"
                      : "Auto-detected YouTube Thumbnail"}
                  </div>
                </div>

                {!thumbnailUrl && detectedYouTubeThumb && (
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    Showing YouTube thumbnail. You can upload a custom cover image below if desired.
                  </p>
                )}
              </div>
            ) : isVideoFile(videoUrl) ? (
              <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>
                  No custom thumbnail uploaded yet. The video's first frame will be displayed automatically on the charity page, or you can upload a custom cover image below.
                </span>
              </div>
            ) : null}

            {/* Thumbnail Upload File Input */}
            <div className="border border-dashed rounded-lg p-4 text-center hover:border-rose-400 transition-colors bg-white dark:bg-zinc-900">
              <input
                type="file"
                id="thumbnail_file_input"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
                disabled={isUploadingThumbnail}
              />
              <label
                htmlFor="thumbnail_file_input"
                className="cursor-pointer flex items-center justify-center gap-2 text-xs font-medium text-foreground py-1"
              >
                {isUploadingThumbnail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                    <span>Uploading Thumbnail...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-rose-500" />
                    <span>
                      {thumbnailUrl
                        ? "Click to change custom thumbnail image"
                        : "Upload custom thumbnail image (PNG, JPG, WebP)"}
                    </span>
                  </>
                )}
              </label>
            </div>

            {/* Or Thumbnail URL */}
            <div className="space-y-1">
              <Label
                htmlFor="thumb_url_input"
                className="text-xs text-muted-foreground"
              >
                Or Thumbnail Image URL:
              </Label>
              <Input
                id="thumb_url_input"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://... image URL for thumbnail"
                className="text-xs h-8"
              />
            </div>
          </div>
        </div>
      )}

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
          disabled={isSubmitting || isUploadingMedia || isUploadingThumbnail}
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
