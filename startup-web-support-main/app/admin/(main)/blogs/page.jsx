"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import blogService from "@/services/blog.service";
import ReusableModal from "../../components/ReusableModal";
import BlogForm from "../../components/BlogForm";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState(null); // holds blog being edited

  const fetchBlogs = async () => {
    const data = await blogService.getAll();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await blogService.remove(id);
    fetchBlogs();
  };

  const handleSave = async (form, close) => {
    try {
      if (editData) {
        await blogService.update(editData.id, form);
      } else {
        await blogService.create(form);
      }

      close();
      setEditData(null);
      fetchBlogs();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs</h1>

        {/* Create Modal */}
        <ReusableModal
          title="Add New Blog"
          triggerLabel="+ New Blog"
          fullScreen="true"
        >
          {({ close }) => (
            <BlogForm
              onSave={(form) => handleSave(form, close)}
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
                  onClick={() => handleDelete(b.id)}
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
          fullScreen={true}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditData(null);
          }}
        >
          {({ close }) => (
            <BlogForm
              selected={editData}
              onSave={(form) => handleSave(form, close)}
              onCancel={() => {
                close();
                setEditData(null);
              }}
            />
          )}
        </ReusableModal>
      )}
    </div>
  );
}
