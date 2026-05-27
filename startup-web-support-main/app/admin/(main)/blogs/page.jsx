"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import blogService from "@/services/blog.service";
import ReusableModal from "../../components/ReusableModal";
import BlogForm from "../../components/BlogForm";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "sonner";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState(null); // holds blog being edited
  const [deleteId, setDeleteId] = useState(null);

  const fetchBlogs = async () => {
    const data = await blogService.getAll();
    setBlogs(data);
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

  const handleSaveSuccess = (close) => {
    close();
    setEditData(null);
    fetchBlogs();
  };

  return (
    <div className="flex-1 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs</h1>

        {/* Create Modal */}
        <ReusableModal
          title="Add New Blog"
          triggerLabel="+ New Blog"
        >
          {({ close }) => (
            <BlogForm
              onSave={() => handleSaveSuccess(close)}
              onCancel={close}
            />
          )}
        </ReusableModal>
      </div>

      {/* Blog list */}
      <div className="grid gap-4">
        {blogs.length === 0 && (
          <p className="text-gray-500 text-sm">No blogs found yet.</p>
        )}

        {blogs.map((b) => (
          <Card key={b.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-600">
                  {b.short_description || "No description"}
                </p>
                <span className="text-xs text-gray-400">
                  {b.status?.toUpperCase()} — {b.author}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditData(b)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(b.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editData && (
        <ReusableModal
          title="Edit Blog"
          triggerLabel=""
          open={!!editData}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditData(null);
          }}
        >
          {({ close }) => (
            <BlogForm
              selected={editData}
              onSave={() => handleSaveSuccess(close)}
              onCancel={() => {
                close();
                setEditData(null);
              }}
            />
          )}
        </ReusableModal>
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
