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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2,
  RefreshCcwIcon,
  Download,
  Trash,
  Search,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Send,
} from "lucide-react";
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
  const [viewContact, setViewContact] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`Copied ${field} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
      setSelectedIds(contacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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

      const formattedData = (data.contacts || []).map((c) => ({
        "Full Name": c.fullname || "",
        "Email": c.email || "",
        "Phone": c.phone || "",
        "Subject": c.subject || "",
        "Page Used": c.pageUsed || "",
        "Message": c.message || "",
        "Date": c.createdAt ? new Date(c.createdAt).toLocaleString() : "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
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
                placeholder="Search by name, email, subject, or message..."
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
                title="Reset Filters"
              >
                <RefreshCcwIcon className="h-4 w-4" />
              </Button>
              <Button onClick={exportToExcel} className="gap-2">
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleBulkDeleteClick}
                  className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                >
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
                          checked={
                            selectedIds.length === contacts.length &&
                            contacts.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Page Used</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow
                        key={contact.id}
                        className={
                          selectedIds.includes(contact.id) ? "bg-muted/50" : ""
                        }
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            className="w-4 h-4 cursor-pointer accent-[#029bd2]"
                            checked={selectedIds.includes(contact.id)}
                            onChange={() => handleSelectOne(contact.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {contact.fullname}
                        </TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || "-"}</TableCell>
                        <TableCell>{contact.subject || "-"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {contact.pageUsed || "-"}
                        </TableCell>
                        <TableCell>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1.5">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/40"
                              onClick={() => setViewContact(contact)}
                              title="View Message & Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
                              onClick={() => handleDeleteClick(contact.id)}
                              title="Delete Contact"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
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

      {/* 👁️ View Contact & Message Modal */}
      <Dialog
        open={!!viewContact}
        onOpenChange={(open) => !open && setViewContact(null)}
      >
        <DialogContent className="max-w-xl sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
          <DialogHeader className="pb-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Contact Submission Details
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Received on{" "}
                  {viewContact?.createdAt
                    ? new Date(viewContact.createdAt).toLocaleString(
                        undefined,
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )
                    : "N/A"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {viewContact && (
            <div className="space-y-5 py-2">
              {/* Sender Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="p-3.5 rounded-xl border bg-muted/30">
                  <span className="text-xs font-medium text-muted-foreground block mb-1">
                    Full Name
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {viewContact.fullname || "N/A"}
                  </p>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-xl border bg-muted/30 flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-2">
                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                      Email
                    </span>
                    <a
                      href={`mailto:${viewContact.email}`}
                      className="text-sm font-medium text-sky-600 hover:underline truncate block"
                    >
                      {viewContact.email || "N/A"}
                    </a>
                  </div>
                  {viewContact.email && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                      onClick={() => handleCopy(viewContact.email, "email")}
                      title="Copy Email"
                    >
                      {copiedField === "email" ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-xl border bg-muted/30 flex items-center justify-between">
                  <div className="min-w-0 flex-1 mr-2">
                    <span className="text-xs font-medium text-muted-foreground block mb-1">
                      Phone Number
                    </span>
                    {viewContact.phone ? (
                      <a
                        href={`tel:${viewContact.phone}`}
                        className="text-sm font-medium text-sky-600 hover:underline"
                      >
                        {viewContact.phone}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Not provided
                      </p>
                    )}
                  </div>
                  {viewContact.phone && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
                      onClick={() => handleCopy(viewContact.phone, "phone")}
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Subject / Service */}
                <div className="p-3.5 rounded-xl border bg-muted/30">
                  <span className="text-xs font-medium text-muted-foreground block mb-1">
                    Subject / Service
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    {viewContact.subject || "General Inquiry"}
                  </p>
                </div>

                {/* Page Source */}
                <div className="p-3.5 rounded-xl border bg-muted/30 sm:col-span-2">
                  <span className="text-xs font-medium text-muted-foreground block mb-1">
                    Source Page URL
                  </span>
                  <p className="text-xs font-mono text-muted-foreground break-all">
                    {viewContact.pageUsed || "/"}
                  </p>
                </div>
              </div>

              {/* Message Body Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-sky-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Message Body / Requirements
                  </span>
                </div>
                <div className="p-4 rounded-xl border bg-background dark:bg-muted/20 min-h-[120px] max-h-[300px] overflow-y-auto admin-scrollbar">
                  {viewContact.message && viewContact.message.trim() ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                      {viewContact.message}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                      <p className="text-sm font-medium">
                        No message body was provided for this submission.
                      </p>
                      <p className="text-xs text-muted-foreground/75 mt-1 max-w-sm">
                        This inquiry was submitted through a quick consultation lead form, or submitted before message recording was configured.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-row justify-between items-center sm:justify-between border-t pt-4">
            <div className="flex gap-2">
              {viewContact?.email && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs"
                  onClick={() =>
                    window.open(
                      `mailto:${viewContact.email}?subject=Re: ${encodeURIComponent(
                        viewContact.subject ||
                          "Your Inquiry with Startup Web Support"
                      )}`
                    )
                  }
                >
                  <Send className="h-3.5 w-3.5 text-sky-600" />
                  Reply Email
                </Button>
              )}
              {viewContact?.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                  onClick={() => {
                    const cleanPhone = viewContact.phone.replace(/[^0-9]/g, "");
                    window.open(`https://wa.me/${cleanPhone}`, "_blank");
                  }}
                >
                  WhatsApp
                </Button>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewContact(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
