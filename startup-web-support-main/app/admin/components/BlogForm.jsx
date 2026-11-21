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
  MapPin,
  Wand2,
  SlidersHorizontal,
  Tag,
  Palette,
  Check,
  RotateCcw,
} from "lucide-react";
import { COMMON_COLORS } from "@/constants";
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
    title_color: "",
    slug: "",
    short_description: "",
    keywords: "",
    content: "",
    image_url: "",
    redirect_url: "",
    author: "",
    status: "draft",
    contactus: false,
    is_location_blog: false,
    location: "",
  });

  const [allBlogs, setAllBlogs] = useState([]);
  const [featuredBlogIds, setFeaturedBlogIds] = useState([]);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(Boolean(blogId && !selected));
  const [autoSlug, setAutoSlug] = useState(true);

  // AI Generation States
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiProvider, setAiProvider] = useState("auto"); // "auto" | "gemini" | "openai"
  const [aiKeywords, setAiKeywords] = useState("");
  const [showAiSettings, setShowAiSettings] = useState(false);

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
        title_color: selected.title_color || "",
        redirect_url: selected.redirect_url || "",
        keywords: selected.keywords || "",
        is_location_blog: Boolean(selected.is_location_blog),
        location: selected.location || "",
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
            title_color: blog.title_color || "",
            redirect_url: blog.redirect_url || "",
            keywords: blog.keywords || "",
            is_location_blog: Boolean(blog.is_location_blog),
            location: blog.location || "",
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

  const handleGenerateWithAI = async () => {
    if (!formData.title || !formData.title.trim()) {
      toast.error("Please enter a blog title or topic first so AI knows what to write about.");
      return;
    }

    if (formData.is_location_blog && (!formData.location || !formData.location.trim())) {
      toast.error("Please enter a target location (e.g. 'Patna, Bihar') for your location blog.");
      return;
    }

    if (formData.content && formData.content.trim().length > 50) {
      const confirmReplace = window.confirm(
        "Generating with AI will update your blog title, slug, summary, and article content. Do you want to proceed?"
      );
      if (!confirmReplace) return;
    }

    setIsGeneratingAI(true);
    const toastId = toast.loading("Crafting high-quality, humanized SEO blog content...");

    try {
      const res = await blogService.generateWithAI({
        title: formData.title.trim(),
        isLocationBlog: formData.is_location_blog,
        location: formData.location ? formData.location.trim() : "",
        keywords: aiKeywords.trim() || formData.keywords?.trim() || "",
        provider: aiProvider,
      });

      if (res?.data) {
        const { title, slug, short_description, keywords, content, is_location_blog, location } = res.data;
        setFormData((prev) => ({
          ...prev,
          title: title || prev.title,
          slug: slug || prev.slug,
          short_description: short_description || prev.short_description,
          keywords: keywords || prev.keywords,
          content: content || prev.content,
          is_location_blog: typeof is_location_blog === "boolean" ? is_location_blog : prev.is_location_blog,
          location: location || prev.location,
        }));
        setAutoSlug(false);
        toast.success("Blog successfully generated with AI! Humanized and SEO optimized.", {
          id: toastId,
        });
      } else {
        toast.error("Failed to generate content: empty response.", { id: toastId });
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to generate AI blog. Please check your GEMINI_API_KEY or OPENAI_API_KEY in backend/.env.";
      toast.error(errorMsg, { id: toastId, duration: 6000 });
    } finally {
      setIsGeneratingAI(false);
    }
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
        {/* ✨ AI Blog Generator Card */}
        <div className="p-6 border border-sky-200/90 dark:border-sky-900/60 rounded-2xl bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-sky-950/20 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-sky-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a4468] via-[#029bd2] to-[#03a9e4] flex items-center justify-center text-white shadow-md shadow-[#029bd2]/20 shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    AI Content Studio & SEO Generator
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Anti-AI Tracking & Humanized
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Generate comprehensive, humanized, SEO-ranking articles using Gemini (Free tier) or OpenAI.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAiSettings((prev) => !prev)}
                className="h-8 text-xs font-medium border-sky-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {showAiSettings ? "Hide Settings" : "AI Settings"}
              </Button>
            </div>
          </div>

          {/* Location Blog Checkbox & Dynamic Location Field */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/90 dark:bg-zinc-800/60 border border-sky-100 dark:border-zinc-700/80 shadow-xs">
              <div className="flex items-start sm:items-center gap-3">
                <input
                  type="checkbox"
                  id="top_is_location_blog_checkbox"
                  checked={formData.is_location_blog}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData((prev) => ({
                      ...prev,
                      is_location_blog: checked,
                      location: checked ? prev.location : "",
                    }));
                  }}
                  className="w-4 h-4 mt-0.5 sm:mt-0 rounded text-[#029bd2] border-zinc-300 dark:border-zinc-600 focus:ring-[#029bd2] cursor-pointer"
                />
                <div>
                  <Label
                    htmlFor="top_is_location_blog_checkbox"
                    className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer flex items-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4 text-[#029bd2]" />
                    Location-Based Blog (Local SEO)
                  </Label>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Check this if you want the article optimized specifically for a target city or region.
                  </p>
                </div>
              </div>

              {formData.is_location_blog && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-900/50 text-[#029bd2] dark:text-sky-300 border border-sky-200 dark:border-sky-800 self-start sm:self-auto">
                  📍 Localized Mode Enabled
                </span>
              )}
            </div>

            {/* Dynamic Location Field */}
            {formData.is_location_blog && (
              <div className="space-y-2 p-4 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 animate-in fade-in-50 duration-200">
                <Label
                  htmlFor="top_blog_location_input"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#029bd2]" />
                  Target Location / City / State <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="top_blog_location_input"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    placeholder="e.g. Patna, Bihar, India (or New York, USA)"
                    className="bg-white dark:bg-zinc-800 border-sky-200 dark:border-zinc-700 focus-visible:ring-[#029bd2] pl-9"
                  />
                  <MapPin className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  AI will infuse regional business insights, local search dynamics, and geographical context for <strong>{formData.location || "your target location"}</strong>.
                </p>
              </div>
            )}

            {/* Optional AI Configuration Settings */}
            {showAiSettings && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 animate-in fade-in-50 duration-200">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    AI Provider / Engine
                  </Label>
                  <Select value={aiProvider} onValueChange={setAiProvider}>
                    <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 h-9 text-xs">
                      <SelectValue placeholder="Select Engine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto (Google Gemini Free Tier → OpenAI Fallback)</SelectItem>
                      <SelectItem value="gemini">Google Gemini (Free tier URL / GEMINI_API_KEY)</SelectItem>
                      <SelectItem value="openai">OpenAI (GPT-4o-mini / OPENAI_API_KEY)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-zinc-500">
                    Reads API keys from backend .env automatically.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Focus Keywords (Optional)
                  </Label>
                  <Input
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                    placeholder="e.g. web development agency, affordable SEO, custom software"
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 h-9 text-xs"
                  />
                  <p className="text-[10px] text-zinc-500">
                    Keywords you want naturally integrated into the text.
                  </p>
                </div>
              </div>
            )}

            {/* Prompt helper & Generate Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#029bd2] shrink-0" />
                <span>
                  Type your <strong>Title / Topic</strong> below{formData.is_location_blog ? " & Location above" : ""}, then click generate.
                </span>
              </div>

              <Button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={isGeneratingAI || isSaving}
                className="h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-[#1a4468] via-[#029bd2] to-[#03a9e4] hover:opacity-95 text-white shadow-md shadow-[#029bd2]/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Crafting Article with AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-white" />
                    <span>Generate Blog with AI</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

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
              <div className="flex items-center justify-between">
                <Label className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Title <span className="text-rose-500">*</span>
                </Label>
                <button
                  type="button"
                  onClick={handleGenerateWithAI}
                  disabled={isGeneratingAI || isSaving}
                  className="text-xs text-primary-brand-color hover:underline flex items-center gap-1 font-medium disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> AI Generate Content
                </button>
              </div>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. 10 Essential Web Trends for 2026"
                style={{
                  color: formData.title_color || undefined,
                  fontWeight: 600,
                }}
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color font-semibold"
              />

              {/* Title Color Selector */}
              <div className="pt-1.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-primary-brand-color" />
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Title Color
                    </span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold inline-flex items-center gap-1.5"
                      style={{ color: formData.title_color || "#111827" }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0 border border-black/10 dark:border-white/10"
                        style={{ backgroundColor: formData.title_color || "#111827" }}
                      />
                      {formData.title_color || "Default (#111827)"}
                    </span>
                  </div>
                  {formData.title_color && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, title_color: "" }))}
                      className="text-[11px] text-zinc-500 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Reset title color to default"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset to Default
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* 12 Common Color Boxes */}
                  {COMMON_COLORS.map((col) => {
                    const isSelected =
                      formData.title_color?.toLowerCase() === col.value.toLowerCase() ||
                      (!formData.title_color && col.value === "#111827");
                    return (
                      <button
                        key={col.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            title_color: col.value === "#111827" ? "" : col.value,
                          }))
                        }
                        className={`w-6 h-6 rounded-md border transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center relative ${
                          isSelected
                            ? "ring-2 ring-primary-brand-color ring-offset-1 border-white dark:border-zinc-900 shadow-xs scale-105"
                            : "border-black/15 dark:border-white/15 hover:shadow-xs"
                        }`}
                        style={{ backgroundColor: col.value }}
                        title={`${col.label} (${col.value})`}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                        )}
                      </button>
                    );
                  })}

                  {/* Custom Color Selector (Current color select) */}
                  <div className="flex items-center gap-1 ml-1 pl-2 border-l border-zinc-200 dark:border-zinc-700">
                    <label
                      className="relative w-6 h-6 rounded-md border border-zinc-300 dark:border-zinc-600 overflow-hidden cursor-pointer shadow-xs flex items-center justify-center shrink-0 hover:scale-105 transition"
                      title="Pick custom title color"
                    >
                      <input
                        type="color"
                        value={formData.title_color || "#111827"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title_color: e.target.value,
                          }))
                        }
                        className="absolute -top-3 -left-3 w-12 h-12 cursor-pointer opacity-0"
                      />
                      <span
                        className="w-full h-full"
                        style={{ backgroundColor: formData.title_color || "#111827" }}
                      />
                    </label>

                    <input
                      type="text"
                      value={formData.title_color || ""}
                      placeholder="#111827"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title_color: e.target.value,
                        }))
                      }
                      className="w-20 h-6 text-[11px] font-mono uppercase px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary-brand-color"
                    />
                  </div>
                </div>

                {formData.title && (
                  <p
                    className="text-xs font-semibold truncate pt-0.5"
                    style={{ color: formData.title_color || "#111827" }}
                  >
                    Live Preview: {formData.title}
                  </p>
                )}
              </div>
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

          {formData.is_location_blog && (
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#029bd2]" />
                Target Location (Local SEO)
              </Label>
              <Input
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="e.g. Patna, Bihar, India"
                className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
              />
            </div>
          )}
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

          {/* SEO Meta Keywords */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary-brand-color" />
                SEO Meta Keywords
              </Label>
              <span className="text-xs text-zinc-400">Comma-separated</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Keywords used in HTML meta tags for Google indexing. Auto-generated by AI and fully editable.
            </p>
            <Input
              name="keywords"
              value={formData.keywords || ""}
              onChange={handleChange}
              placeholder="e.g. web development, SEO strategies, Next.js optimization, digital growth"
              className="bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary-brand-color"
            />
            {formData.keywords && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {formData.keywords
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean)
                  .map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60"
                    >
                      #{kw}
                    </span>
                  ))}
              </div>
            )}
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
