"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import blogService from "@/services/blog.service";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "sonner";
import {
  Plus,
  Edit3,
  Trash2,
  BookOpen,
  CheckCircle2,
  Clock,
  User,
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getAll();
      setBlogs(data || []);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await blogService.remove(deleteId);
        toast.success("Blog deleted successfully");
        setDeleteId(null);
        fetchBlogs();
      } catch (err) {
        toast.error("Failed to delete blog");
        console.error(err);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-brand-color" />
            Blogs
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage, publish and organize your articles and announcements.
          </p>
        </div>

        <Link href="/admin/blogs/new">
          <Button className="bg-gradient-to-r from-[#1a4468] to-[#029bd2] hover:opacity-90 text-white shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Blog
          </Button>
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary-brand-color" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading blogs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/20">
          <BookOpen className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            No blogs found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-1 mb-5">
            You haven't written any blog posts yet. Get started by creating your first article.
          </p>
          <Link href="/admin/blogs/new">
            <Button className="bg-gradient-to-r from-[#1a4468] to-[#029bd2] hover:opacity-90 text-white shadow-md flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Blog
            </Button>
          </Link>
        </div>
      )}

      {/* Blog list */}
      {!loading && blogs.length > 0 && (
        <div className="grid gap-4">
          {blogs.map((b) => (
            <Card
              key={b.id}
              className="border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all bg-white dark:bg-zinc-900 shadow-xs"
            >
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {b.image_url ? (
                    <img
                      src={b.image_url}
                      alt={b.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-800"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 truncate">
                        {b.title}
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                          b.status === "published"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {b.status === "published" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {b.status?.toUpperCase() || "DRAFT"}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {b.short_description || "No short description provided."}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 pt-0.5">
                      {b.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {b.author}
                        </span>
                      )}
                      {b.slug && (
                        <span className="font-mono text-[11px] truncate max-w-xs text-zinc-400">
                          /{b.slug}
                        </span>
                      )}
                      {b.redirect_url && (
                        <a
                          href={
                            b.redirect_url.startsWith("http://") ||
                            b.redirect_url.startsWith("https://")
                              ? b.redirect_url
                              : `https://${b.redirect_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 hover:underline max-w-[200px] truncate"
                          title={`Redirects to: ${b.redirect_url}`}
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{b.redirect_url}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link href={`/admin/blogs/edit/${b.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(b.id)}
                    className="flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
}
