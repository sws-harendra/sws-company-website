"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import blogService from "@/services/blog.service";
import CommonServices from "@/services/common.service";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Loader2, X, FileText, Settings, Image as ImageIcon } from "lucide-react";

const RichTextEditor = dynamic(
  () => import("@/app/admin/components/RichTextEditor"),
  { ssr: false }
);

export default function BlogForm({ selected, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    content: "",
    image_url: "",
    author: "",
    status: "draft",
    contactus: false,
  });
  const [allBlogs, setAllBlogs] = useState([]);
  const [featuredBlogIds, setFeaturedBlogIds] = useState([]);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setAllBlogs(blogs);
    };
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (selected) {
      setFormData(selected);
      setPreview(selected.image_url || "");
      if (selected.FeaturedBlogs) {
        setFeaturedBlogIds(selected.FeaturedBlogs.map((b) => b.id));
      }
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await CommonServices.uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: uploaded.url }));
      setPreview(uploaded.url);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let blog;
      if (selected) {
        blog = await blogService.update(selected.id, formData);
      } else {
        blog = await blogService.create(formData);
      }

      if (featuredBlogIds.length) {
        await blogService.setFeatured(blog.id || selected.id, featuredBlogIds);
      }

      toast.success(selected ? "Blog updated successfully!" : "Blog created successfully!");
      if (onSave) onSave();
    } catch (err) {
      toast.error("Error saving blog");
      console.error("Error saving blog:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-zinc-900 w-full p-2 rounded-xl max-h-[75vh] overflow-y-auto admin-scrollbar"
    >
      {/* Basic Info Card */}
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 space-y-4">
        <div className="flex items-center gap-2 mb-2 text-primary-brand-color">
          <FileText className="w-5 h-5" />
          <h3 className="font-medium text-lg text-zinc-800 dark:text-zinc-200">Basic Info</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-600 dark:text-zinc-400">Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. 10 Web Trends"
              className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-600 dark:text-zinc-400">Slug</Label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="e.g. 10-web-trends"
              className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-600 dark:text-zinc-400">Author</Label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-600 dark:text-zinc-400">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-primary-brand-color">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-zinc-600 dark:text-zinc-400">Short Description</Label>
          <Textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="A brief summary of the blog post..."
            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color resize-none min-h-[80px]"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label className="text-zinc-600 dark:text-zinc-400">Main Content</Label>
          <div className="bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
             <RichTextEditor
               value={formData.content}
               onChange={handleContentChange}
             />
          </div>
        </div>
      </div>

      {/* Media Card */}
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 space-y-4">
        <div className="flex items-center gap-2 mb-2 text-primary-brand-color">
          <ImageIcon className="w-5 h-5" />
          <h3 className="font-medium text-lg text-zinc-800 dark:text-zinc-200">Media</h3>
        </div>
        
        <div className="space-y-3">
          <Label className="text-zinc-600 dark:text-zinc-400">Featured Image</Label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="group relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 hover:border-primary-brand-color hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200">
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                  <span className="text-xs text-zinc-500 font-medium">Uploading...</span>
                </div>
              ) : preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded-md">Change</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400 group-hover:text-primary-brand-color transition-colors">
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-xs font-medium">Upload</span>
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
                variant="destructive"
                size="sm"
                onClick={() => {
                  setPreview("");
                  setFormData((prev) => ({ ...prev, image_url: "" }));
                }}
                className="flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 space-y-4">
        <div className="flex items-center gap-2 mb-2 text-primary-brand-color">
          <Settings className="w-5 h-5" />
          <h3 className="font-medium text-lg text-zinc-800 dark:text-zinc-200">Settings</h3>
        </div>

        <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
          <div className="space-y-0.5">
            <Label className="text-base font-medium">Show Contact Us</Label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Display a contact form at the bottom of this blog post.
            </p>
          </div>
          <Switch
            checked={formData.contactus}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, contactus: checked }))
            }
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-zinc-600 dark:text-zinc-400">Featured Blogs</Label>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
            Hold Ctrl (or Cmd) to select multiple blogs to feature.
          </p>
          <select
            multiple
            value={featuredBlogIds}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (o) =>
                Number(o.value)
              );
              setFeaturedBlogIds(values);
            }}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-brand-color admin-scrollbar h-40"
          >
            {allBlogs
              .filter((b) => b.id !== selected?.id)
              .map((b) => (
                <option key={b.id} value={b.id} className="p-2 mb-1 rounded cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 checked:bg-primary-brand-color/10 checked:text-primary-brand-color transition-colors">
                  {b.title}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 min-w-24"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSaving || uploading}
          className="bg-gradient-to-r from-[#1a4468] to-[#029bd2] hover:opacity-90 text-white min-w-32 shadow-md transition-opacity"
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </div>
          ) : selected ? (
            "Update Blog"
          ) : (
            "Create Blog"
          )}
        </Button>
      </div>
    </form>
  );
}
