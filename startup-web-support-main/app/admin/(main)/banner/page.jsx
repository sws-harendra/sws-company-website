"use client";

import { useEffect, useState } from "react";
import BannerForm from "../../components/bannerform";
import BannerCard from "../../components/BannerCard";
import bannerService from "@/services/banner.service";
import EmptyState from "../../components/EmptyData";
import ReusableModal from "../../components/ReusableModal";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "sonner";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadBanners = async () => {
    const data = await bannerService.getAll();
    setBanners(data);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleSave = async (form, close) => {
    const payload = {
      ...form,
      image_url: form.bannerImage,
    };

    if (editData) {
      await bannerService.update(editData.id, payload);
    } else {
      await bannerService.create(payload);
    }

    close();
    setEditData(null);
    loadBanners();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await bannerService.remove(deleteId);
        toast.success("Banner deleted successfully");
        setDeleteId(null);
        loadBanners();
      } catch (err) {
        toast.error("Failed to delete banner");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Banners</h1>

        <ReusableModal 
          title="Add New Banner" 
          triggerLabel="+ Add Banner"
          triggerClassName="bg-gradient-to-r from-[#1a4468] via-[#102d45] to-[#029bd2] hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          {({ close }) => (
            <BannerForm
              onSave={(form) => handleSave(form, close)}
              onCancel={close}
            />
          )}
        </ReusableModal>
      </div>

      {banners.length === 0 && <EmptyState heading="No Banners Yet" />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {banners.map((banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
            onEdit={(b) => setEditData(b)}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {editData && (
        <ReusableModal
          title="Edit Banner"
          triggerLabel=""
          open={!!editData}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditData(null);
          }}
        >
          {({ close }) => (
            <BannerForm
              initialData={editData}
              onSave={(form) => handleSave(form, close)}
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
        title="Delete Banner"
        description="Are you sure you want to delete this banner? This action cannot be undone."
      />
    </div>
  );
}
