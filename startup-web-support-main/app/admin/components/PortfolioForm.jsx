"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonServices from "@/services/common.service";

const PortfolioForm = ({ onSave, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    image_url: initialData.image_url || "",
    redirect_url: initialData.redirect_url || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await CommonServices.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        image_url: response.url,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter portfolio title"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter portfolio description"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          rows={3}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Portfolio Image *</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
        )}
        {formData.image_url && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Image Preview:</p>
            <div className="w-full max-w-xs">
              <img
                src={formData.image_url}
                alt="Portfolio preview"
                className="w-full h-auto max-h-48 object-cover rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Redirect URL */}
      <div className="space-y-2">
        <Label htmlFor="redirect_url">Redirect URL</Label>
        <Input
          id="redirect_url"
          name="redirect_url"
          type="url"
          value={formData.redirect_url}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || isUploading}>
          {isLoading ? "Saving..." : "Save Portfolio"}
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
