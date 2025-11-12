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

const RichTextEditor = dynamic(
  () => import("@/app/admin/components/RichTextEditor"),
  { ssr: false }
);

export default function BlogForm({ selected, onSuccess }) {
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

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setAllBlogs(blogs);
    };
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (selected?.FeaturedBlogs) {
      setFeaturedBlogIds(selected.FeaturedBlogs.map((b) => b.id));
    }
  }, [selected]);

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selected) {
      setFormData(selected);
      setPreview(selected.image_url || "");
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle rich text editor updates
  const handleContentChange = (html) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  // Handle image upload
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
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let blog;

      if (selected) {
        blog = await blogService.update(selected.id, formData);
      } else {
        blog = await blogService.create(formData);
      }

      console.log("Saved Blog:", blog);
      console.log("Selected featuredBlogIds:", featuredBlogIds);

      // ✅ Save featured blogs if any selected
      if (featuredBlogIds.length) {
        await blogService.setFeatured(blog.id || selected.id, featuredBlogIds);
      }

      toast.success("Blog saved successfully!");
      // onSuccess();
    } catch (err) {
      toast.error("Error saving blog");
      console.error("Error saving blog:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-full overflow-y-auto bg-white w-full p-4 rounded-xl shadow"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Slug</Label>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <Label>Short Description</Label>
        <Textarea
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Content</Label>
        <RichTextEditor
          value={formData.content}
          onChange={handleContentChange}
        />
      </div>

      {/* Image Upload Section */}
      <div className="space-y-2">
        <Label>Blog Image</Label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center justify-center border w-28 h-28 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition">
            {uploading ? (
              <span className="text-sm text-gray-500">Uploading...</span>
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-sm text-gray-400">Select Image</span>
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
              onClick={() => {
                setPreview("");
                setFormData((prev) => ({ ...prev, image_url: "" }));
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
      {/* Contact Us Toggle */}
      <div className="flex items-center justify-between border p-3 rounded-md">
        <div>
          <Label>Show in Contact Us</Label>
          <p className="text-sm text-gray-500">
            Enable this if you want contact Us form below this blog.
          </p>
        </div>
        <Switch
          checked={formData.contactus}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, contactus: checked }))
          }
        />
      </div>
      <div>
        <Label>Featured Blogs</Label>
        <select
          multiple
          value={featuredBlogIds}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (o) =>
              Number(o.value)
            );
            setFeaturedBlogIds(values);
          }}
          className="border rounded-md p-2 w-full h-32"
        >
          {allBlogs
            .filter((b) => b.id !== selected?.id) // don’t feature itself
            .map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
        </select>
        <p className="text-xs text-gray-500">
          Hold Ctrl/Cmd to select multiple featured blogs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Author</Label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Status</Label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {selected ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
}
