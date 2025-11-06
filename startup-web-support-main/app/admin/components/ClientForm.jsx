"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonServices from "@/services/common.service"; // ✅ import your upload service
// import { useToast } from "@/components/ui/use-toast"; // uncomment if you have a toast hook

const ClientForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    brandName: initialData.brandName || "",
    url: initialData.url || "",
    logo: initialData.logo || "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle logo upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await CommonServices.uploadImage(file);
      // Assuming CommonServices returns { url: "uploaded_file_url" }
      setFormData((prev) => ({
        ...prev,
        logo: response.url,
      }));
      // toast({ title: "Logo uploaded successfully!" });
    } catch (error) {
      console.error("Upload failed:", error);
      // toast({ title: "Failed to upload logo", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      // toast({ title: "Client saved successfully!" });
    } catch (error) {
      console.error(error);
      // toast({ title: "Failed to save client", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Brand Name */}
      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          placeholder="Enter brand name"
          required
        />
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="url">Website URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label htmlFor="logo">Upload Logo</Label>
        <Input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
        )}
        {formData.logo && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Logo Preview:</p>
            <div className="w-20 h-20 border rounded-md overflow-hidden">
              <img
                src={formData.logo}
                alt="Logo preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading || isUploading}>
          {isLoading ? "Saving..." : "Save Client"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
