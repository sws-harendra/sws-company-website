"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcwIcon, Download, Trash, Search } from "lucide-react";
import contactService from "@/services/contact.service";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import ConfirmModal from "@/app/admin/components/ConfirmModal";

const ContactedPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await contactService.deleteContact(deleteId);
        toast.success("Contact deleted successfully");
        loadContacts();
      } catch (error) {
        toast.error("Failed to delete contact");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(contacts.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDeleteClick = () => {
    if (selectedIds.length > 0) {
      setShowBulkDeleteModal(true);
    }
  };

  const handleConfirmBulkDelete = async () => {
    try {
      await contactService.bulkDelete(selectedIds);
      toast.success(`${selectedIds.length} contacts deleted successfully`);
      setSelectedIds([]);
      loadContacts();
    } catch (err) {
      toast.error("Failed to delete contacts");
    } finally {
      setShowBulkDeleteModal(false);
    }
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAllContacts({
        q: search,
        page,
        limit: 10,
        startDate,
        endDate,
      });
      setContacts(data.contacts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [page, search, startDate, endDate]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // 📦 Export data to Excel
  const exportToExcel = async () => {
    try {
      // Fetch all contacts (no pagination)
      const data = await contactService.getAllContacts({
        q: search,
        startDate,
        endDate,
        page: 1,
        limit: 10000, // large number to fetch all
      });

      const worksheet = XLSX.utils.json_to_sheet(data.contacts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
      XLSX.writeFile(workbook, "contacts.xlsx");
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col transition-colors duration-300 container mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Contacted Users
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            List of all people who contacted via your website forms
          </p>
        </CardHeader>

        <CardContent>
          {/* 🔍 Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="relative max-w-sm flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or subject..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setSearch("");
                  loadContacts();
                }}
                size="icon"
              >
                <RefreshCcwIcon className="h-4 w-4" />
              </Button>
              <Button onClick={exportToExcel} className="gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              {selectedIds.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDeleteClick} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
                  <Trash className="h-4 w-4" />
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </div>
          </div>

          {/* 📋 Table */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center text-muted-foreground py-6">
              No contacts found.
            </div>
          ) : (
            <>
          <div className="rounded-md border overflow-x-auto admin-scrollbar">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 cursor-pointer accent-[#029bd2]" 
                          checked={selectedIds.length === contacts.length && contacts.length > 0} 
                          onChange={handleSelectAll} 
                        />
                      </TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Page Used</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className={selectedIds.includes(contact.id) ? "bg-muted/50" : ""}>
                        <TableCell>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 cursor-pointer accent-[#029bd2]" 
                            checked={selectedIds.includes(contact.id)} 
                            onChange={() => handleSelectOne(contact.id)} 
                          />
                        </TableCell>
                        <TableCell>{contact.fullname}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>{contact.pageUsed}</TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </TableCell>{" "}
                        <TableCell>
                          <Trash
                            className="cursor-pointer"
                            onClick={() => handleDeleteClick(contact.id)}
                            color="red"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
      />
      
      <ConfirmModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Contacts"
        description={`Are you sure you want to delete ${selectedIds.length} contacts? This action cannot be undone.`}
      />
    </div>
  );
};

export default ContactedPage;
