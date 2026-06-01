"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Search } from "lucide-react";
import testimonialService from "@/services/testimonial.service";
import ReusableModal from "@/app/admin/components/ReusableModal";
import TestimonialForm from "@/app/admin/components/TestimonialForm";
import ConfirmModal from "@/app/admin/components/ConfirmModal";
import { toast } from "sonner";
import { ADD_BUTTON_CLASS } from "@/constants";

export default function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await testimonialService.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await testimonialService.remove(deleteId);
        toast.success("Testimonial deleted successfully");
        setDeleteId(null);
        fetchTestimonials();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete testimonial");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await testimonialService.update(editingItem.id, formData);
      } else {
        await testimonialService.create(formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.client_position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage testimonials from your clients
          </p>
        </div>

        <Button onClick={openAddModal} className={`${ADD_BUTTON_CLASS} flex items-center gap-2`}>
          + Add Testimonial
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No testimonials found."
                : "No testimonials added yet."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.client_name}
                    </TableCell>
                    <TableCell>{item.client_position || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.text}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <ReusableModal
          title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          {({ close }) => (
            <TestimonialForm
              initialData={editingItem || {}}
              onSave={(form) => handleSave(form, close)}
            />
          )}
        </ReusableModal>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
}
