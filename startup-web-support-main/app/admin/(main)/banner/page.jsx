"use client";

import { useEffect, useState } from "react";
import BannerForm from "../../components/bannerform";
import BannerCard from "../../components/BannerCard";
import bannerService from "@/services/banner.service";
import EmptyState from "../../components/EmptyData";
import ReusableModal from "../../components/ReusableModal";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [editData, setEditData] = useState(null);

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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      await bannerService.remove(id);
      loadBanners();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl font-semibold">Banners</h1>

        <ReusableModal title="Add New Banner" triggerLabel="+ Add Banner">
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
            onDelete={handleDelete}
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
    </div>
  );
}
