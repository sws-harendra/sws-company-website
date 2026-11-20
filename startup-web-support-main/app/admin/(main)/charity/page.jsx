"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pencil,
  Trash2,
  ExternalLink,
  Search,
  Heart,
  Video,
  Image as ImageIcon,
  MapPin,
  Calendar,
} from "lucide-react";
import charityService from "@/services/charity.service";
import ReusableModal from "@/app/admin/components/ReusableModal";
import CharityForm from "@/app/admin/components/CharityForm";
import ConfirmModal from "@/app/admin/components/ConfirmModal";
import { toast } from "sonner";
import Link from "next/link";
import { resolveCharityMedia } from "@/lib/videoUtils";

export default function AdminCharityPage() {
  const [charities, setCharities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCharities = async () => {
    try {
      setIsLoading(true);
      const data = await charityService.getAll({
        page: 1,
        limit: 100,
        search: searchTerm,
      });
      setCharities(data.charities || []);
    } catch (error) {
      console.error("Failed to fetch charity media:", error);
      toast.error("Failed to load charity media");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharities();
  }, [searchTerm]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    const idToDelete = deleteId;
    if (!idToDelete) return;

    try {
      await charityService.remove(idToDelete);
      toast.success("Item deleted successfully");
      setDeleteId(null);
      fetchCharities();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.error || "Failed to delete item");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingCharity) {
        await charityService.update(editingCharity.id, formData);
        toast.success("Updated successfully");
      } else {
        await charityService.create(formData);
        toast.success("Added successfully");
      }
      setIsModalOpen(false);
      setEditingCharity(null);
      fetchCharities();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save charity item");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Charity Photos & Videos
          </h1>
          <p className="text-sm text-muted-foreground">
            Add and manage photos and videos displayed on the charity page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/charity"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border bg-background hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </Link>
          <Button
            onClick={() => {
              setEditingCharity(null);
              setIsModalOpen(true);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-md rounded-xl"
          >
            + Add Photo / Video
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by title, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 rounded-lg"
        />
      </div>

      {/* Media Grid Display */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
        </div>
      ) : charities.length === 0 ? (
        <Card className="rounded-xl border border-dashed p-10 text-center">
          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-40" />
          <p className="text-sm font-semibold text-foreground">
            No charity photos or videos added yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Click "+ Add Photo / Video" to upload your first moment.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {charities.map((item) => {
            const {
              isVideo,
              videoUrl,
              thumbnailUrl,
              isDirectVideo,
            } = resolveCharityMedia(item);

            return (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border bg-card shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : isDirectVideo && videoUrl ? (
                    <video
                      src={videoUrl}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-muted-foreground">
                      {isVideo ? (
                        <Video className="w-8 h-8 text-rose-500" />
                      ) : (
                        <ImageIcon className="w-8 h-8 opacity-40" />
                      )}
                    </div>
                  )}

                  {isVideo && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-sm">
                      <Video className="w-3 h-3 text-rose-400" /> Video
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1 text-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  )}
                  {(item.location || item.date) && (
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2 pt-2 border-t">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      )}
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-2 pt-0 flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingCharity(item);
                      setIsModalOpen(true);
                    }}
                    className="h-7 w-7 hover:text-rose-600"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(item.id);
                    }}
                    className="h-7 w-7 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      <ReusableModal
        title={
          editingCharity ? "Edit Photo / Video" : "Add Charity Photo or Video"
        }
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        maxWidth="max-w-xl"
      >
        <CharityForm
          initialData={editingCharity || {}}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCharity(null);
          }}
        />
      </ReusableModal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Charity Media"
        description="Are you sure you want to delete this media item? It will be permanently removed from the website."
      />
    </div>
  );
}
