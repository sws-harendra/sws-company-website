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
import { Pencil, Trash2 } from "lucide-react";
import clientService from "@/services/client.service";
import ReusableModal from "@/app/admin/components/ReusableModal";
import ClientForm from "@/app/admin/components/ClientForm";

export default function OurClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // For add/edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const data = await clientService.getAll();
      setClients(data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      toast("some error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      await clientService.remove(id);
      toast({
        title: "Success",
        description: "Client deleted successfully!",
      });
      fetchClients();
    } catch (error) {
      console.error("Delete failed:", error);
      toast("some error occurred");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingClient) {
        await clientService.update(editingClient.id, formData);
      } else {
        await clientService.create(formData);
      }

      setIsModalOpen(false);
      setEditingClient(null);
      fetchClients();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const openAddModal = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Our Clients</h1>
          <p className="text-sm text-muted-foreground">
            Manage your clients and their information
          </p>
        </div>

        <Button onClick={openAddModal} className="flex items-center gap-2">
          + Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm
                ? "No clients found matching your search."
                : "No clients added yet."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="w-10 h-10">
                        <img
                          src={client.logo}
                          alt={client.brandName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'/%3E%3Cpath d='M12 9.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {client.brandName}
                    </TableCell>
                    <TableCell>
                      <a
                        href={
                          client?.url?.startsWith("http")
                            ? client.url
                            : `https://${client?.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {client?.url?.replace(/^https?:\/\//, "")}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(client)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(client.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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
          title={editingClient ? "Edit Client" : "Add Client"}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          {({ close }) => (
            <ClientForm
              initialData={editingClient || {}}
              onSave={(form) => handleSave(form, close)}
              onCancel={close}
            />
          )}
        </ReusableModal>
      )}
    </div>
  );
}
