"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import blogService from "@/services/blog.service";
import CommonServices from "@/services/common.service";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ImagePlus,
  Loader2,
  X,
  FileText,
  Settings,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Link2,
  ExternalLink,
  Save,
  Globe,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../(main)/context/AuthContext";

const RichTextEditor = dynamic(
  () => import("@/app/admin/components/RichTextEditor"),
  { ssr: false },
);

function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BlogForm({ selected, blogId, onSave, onCancel }) {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    content: "",
    image_url: "",
    redirect_url: "",
    author: "",
    status: "draft",
    contactus: false,
  });

  const [allBlogs, setAllBlogs] = useState([]);
  const [featuredBlogIds, setFeaturedBlogIds] = useState([]);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(Boolean(blogId && !selected));
  const [autoSlug, setAutoSlug] = useState(true);

  const effectiveId = selected?.id || blogId || formData?.id;
  const isEditing = Boolean(effectiveId);

  // Auth protection check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load all blogs for featured selector
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setAllBlogs(blogs || []);
      } catch (err) {
        console.error("Failed to fetch all blogs:", err);
      }
    };
    fetchAllBlogs();
  }, []);

  // Set selected if passed directly
  useEffect(() => {
    if (selected) {
      setFormData({
        ...selected,
        redirect_url: selected.redirect_url || "",
      });
      setPreview(selected.image_url || "");
      setAutoSlug(false);
      if (selected.FeaturedBlogs) {
        setFeaturedBlogIds(selected.FeaturedBlogs.map((b) => b.id));
      }
    }
  }, [selected]);

  // Fetch blog data if blogId is provided
  useEffect(() => {
    if (blogId && !selected) {
      let isMounted = true;
      setLoadingBlog(true);
      blogService
        .getById(blogId)
        .then((blog) => {
          if (!isMounted || !blog) return;
          setFormData({
            ...blog,
            redirect_url: blog.redirect_url || "",
          });
          setPreview(blog.image_url || "");
          setAutoSlug(false);
          if (blog.FeaturedBlogs) {
            setFeaturedBlogIds(blog.FeaturedBlogs.map((b) => b.id));
          }
        })
        .catch((err) => {
          console.error("Failed to fetch blog:", err);
          toast.error("Could not load blog details.");
        })
        .finally(() => {
          if (isMounted) setLoadingBlog(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [blogId, selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && autoSlug && !isEditing) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    setFormData((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleGenerateSlug = () => {
    setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
    setAutoSlug(true);
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
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/admin/blogs");
    }
  };

  const handleSave = async (forcedStatus) => {
    if (!formData.title?.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    const targetStatus = forcedStatus || formData.status || "published";

    setIsSaving(true);
    const dataToSave = {
      ...formData,
      status: targetStatus,
    };

    setFormData((prev) => ({ ...prev, status: targetStatus }));

    try {
      let savedBlog;
      if (isEditing) {
        savedBlog = await blogService.update(effectiveId, dataToSave);
      } else {
        savedBlog = await blogService.create(dataToSave);
      }

      const targetId = savedBlog?.id || effectiveId;
      if (targetId && featuredBlogIds.length) {
        await blogService.setFeatured(targetId, featuredBlogIds);
      }

      toast.success(
        targetStatus === "published"
          ? isEditing
            ? "Blog updated and published successfully!"
            : "Blog published successfully!"
          : isEditing
            ? "Draft updated successfully!"
            : "Draft saved successfully!",
      );

      if (onSave) {
        onSave();
      } else {
        router.push("/admin/blogs");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error saving blog");
      console.error("Error saving blog:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    await handleSave();
  };

  // Permission authorization verification
  const requiredPermission = isEditing ? "edit_blog" : "create_blog";
  const userPermissions = user?.permissions || [];
  const hasPermission =
    !user ||
    userPermissions.includes(requiredPermission) ||
    userPermissions.includes("view_blog");

  if (authLoading || loadingBlog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary-brand-color" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {loadingBlog ? "Loading blog details..." : "Authenticating..."}
        </p>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
        <ShieldAlert className="w-12 h-12 text-rose-500" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Access Denied
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            You do not have permission ({requiredPermission}) to manage this
            blog.
          </p>
        </div>
        <Link href="/admin/blogs">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Header & Quick Actions Bar */}

        {/* Basic Info Card */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-primary-brand-color pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <FileText className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                Title <span className="text-rose-500">*</span>
              </Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. 10 Essential Web Trends for 2026"
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Slug / URL <span className="text-rose-500">*</span>
                </Label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-xs text-primary-brand-color hover:underline flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3 h-3" /> Auto-generate
                </button>
              </div>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                required
                placeholder="e.g. 10-essential-web-trends-for-2026"
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                Author
              </Label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Startup Web Support Editorial"
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                Publishing Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus:ring-primary-brand-color">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    Draft (Hidden from public)
                  </SelectItem>
                  <SelectItem value="published">
                    Published (Live on site)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Short Description & Main Content */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-primary-brand-color pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <FileText className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
              Content & Summary
            </h3>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
              Short Description / Summary
            </Label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              A brief preview paragraph shown on blog listing cards and search
              engines.
            </p>
            <Textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Write a concise overview that catches reader attention..."
              className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color resize-y min-h-[90px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
              Main Article Content
            </Label>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
              />
            </div>
          </div>
        </div>

        {/* Media & Featured Image */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-primary-brand-color pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <ImageIcon className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
              Media & Featured Image
            </h3>
          </div>

          <div className="space-y-3">
            <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
              Featured Banner Image
            </Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <label className="group relative cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-44 h-40 rounded-2xl overflow-hidden bg-zinc-50/60 dark:bg-zinc-800/30 hover:border-primary-brand-color hover:bg-zinc-100/50 dark:hover:bg-zinc-800/60 transition-all duration-200">
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 p-3 text-center">
                    <Loader2 className="w-7 h-7 animate-spin text-primary-brand-color" />
                    <span className="text-xs text-zinc-500 font-medium">
                      Uploading image...
                    </span>
                  </div>
                ) : preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xs font-semibold bg-black/70 px-3 py-1.5 rounded-lg">
                        Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-3 text-center text-zinc-500 dark:text-zinc-400 group-hover:text-primary-brand-color transition-colors">
                    <ImagePlus className="w-9 h-9" />
                    <span className="text-xs font-medium">
                      Click to upload banner
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      PNG, JPG, WEBP
                    </span>
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
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setPreview("");
                      setFormData((prev) => ({ ...prev, image_url: "" }));
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" /> Remove Banner
                  </Button>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Image URL:{" "}
                    <span className="font-mono text-[11px] truncate inline-block max-w-[280px] align-bottom">
                      {formData.image_url}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
            <Label
              htmlFor="redirect_url"
              className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2"
            >
              <Link2 className="w-4 h-4 text-primary-brand-color" />
              Featured Image Redirect URL (Optional)
            </Label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              When clicked on the published blog, the featured image redirects
              to this URL in a new page/tab.
            </p>
            <div className="relative">
              <Input
                id="redirect_url"
                name="redirect_url"
                type="url"
                value={formData.redirect_url || ""}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color pl-9"
              />
              <Link2 className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {formData.redirect_url && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                <ExternalLink className="w-3.5 h-3.5 text-primary-brand-color shrink-0" />
                <span>Redirects to:</span>
                <a
                  href={
                    formData.redirect_url.startsWith("http://") ||
                    formData.redirect_url.startsWith("https://")
                      ? formData.redirect_url
                      : `https://${formData.redirect_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-brand-color hover:underline font-medium truncate max-w-md"
                >
                  {formData.redirect_url}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Settings & Featured Blogs */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-primary-brand-color pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <Settings className="w-5 h-5" />
            <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
              Options & Related Articles
            </h3>
          </div>

          <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                Show Contact Us Widget
              </Label>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Display an interactive lead capture form at the bottom of this
                blog post.
              </p>
            </div>
            <Switch
              checked={formData.contactus}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, contactus: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
              Featured / Related Blogs
            </Label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Hold Ctrl (or Cmd on Mac) to select multiple blogs to feature at
              the end of this article.
            </p>
            <select
              multiple
              value={featuredBlogIds}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (o) =>
                  Number(o.value),
                );
                setFeaturedBlogIds(values);
              }}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-brand-color admin-scrollbar h-44"
            >
              {allBlogs
                .filter((b) => b.id !== (selected?.id || effectiveId))
                .map((b) => (
                  <option
                    key={b.id}
                    value={b.id}
                    className="p-2 mb-1 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 checked:bg-primary-brand-color/15 checked:text-primary-brand-color transition-colors font-medium"
                  >
                    {b.title}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Bottom Form Actions */}
        <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Current Status:</span>
            <span
              className={`font-semibold capitalize px-2.5 py-0.5 rounded-full text-xs ${
                formData.status === "published"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              }`}
            >
              {formData.status}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="h-11 px-5 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={isSaving || uploading}
              className="h-11 px-5 rounded-xl font-medium border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save as Draft
            </Button>

            <Button
              type="submit"
              onClick={() => handleSave("published")}
              disabled={isSaving || uploading}
              className="h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-[#1a4468] via-[#102d45] to-[#029bd2] hover:opacity-95 text-white shadow-lg active:scale-95 transition-all"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Publishing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-white" />
                  <span>
                    {isEditing && formData.status === "published"
                      ? "Update & Publish"
                      : "Publish Blog"}
                  </span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
