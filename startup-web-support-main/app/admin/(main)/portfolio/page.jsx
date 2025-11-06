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
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import portfolioService from "@/services/portfolio.service";
import ReusableModal from "@/app/admin/components/ReusableModal";
import PortfolioForm from "@/app/admin/components/PortfolioForm";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      const { page, limit } = pagination;
      const data = await portfolioService.getAll({
        page,
        limit,
        search: searchTerm,
      });
      setPortfolios(data.portfolios || []);
      setPagination((prev) => ({
        ...prev,
        totalItems: data.totalItems || 0,
        totalPages: data.totalPages || 1,
      }));
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [pagination.page, pagination.limit, searchTerm]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this portfolio item?"))
      return;

    try {
      await portfolioService.remove(id);
      fetchPortfolios();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSave = async (formData, closeModal) => {
    try {
      if (editingPortfolio) {
        await portfolioService.update(editingPortfolio.id, formData);
      } else {
        await portfolioService.create(formData);
      }
      closeModal();
      setEditingPortfolio(null);
      fetchPortfolios();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const openAddModal = () => {
    setEditingPortfolio(null);
    setIsModalOpen(true);
  };

  const openEditModal = (portfolio) => {
    setEditingPortfolio(portfolio);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Portfolio</h1>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio items
          </p>
        </div>
        <ReusableModal
          title="Add Portfolio Item"
          triggerLabel=" + Add Portfolio Item"
          //   fullScreen="true"
        >
          {({ close }) => (
            <PortfolioForm
              onSave={(form) => handleSave(form, close)}
              onCancel={close}
            />
          )}
        </ReusableModal>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search portfolios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Portfolio Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No portfolios found matching your search."
                : "No portfolio items added yet."}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolios.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-16 h-16">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3Cpath d='M12 9.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z'/%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {item.description || "No description"}
                      </TableCell>
                      <TableCell>
                        {item.redirect_url && (
                          <a
                            href={
                              item.redirect_url.startsWith("http")
                                ? item.redirect_url
                                : `https://${item.redirect_url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {" "}
                          <ReusableModal
                            title="Edit Portfolio"
                            triggerLabel=""
                            open={
                              isModalOpen && editingPortfolio?.id === item.id
                            }
                            // fullScreen={true}
                            onOpenChange={(isOpen) => {
                              if (!isOpen) {
                                setIsModalOpen(false);
                                setEditingPortfolio(null);
                              }
                            }}
                          >
                            {({ close }) => (
                              <PortfolioForm
                                initialData={editingPortfolio || {}}
                                onSave={(form) => handleSave(form, close)}
                                onCancel={() => {
                                  close();
                                  setIsModalOpen(false);
                                  setEditingPortfolio(null);
                                }}
                              />
                            )}
                          </ReusableModal>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(item)} // ✅ just calls your existing function
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button> */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
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

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
    </div>
  );
}
