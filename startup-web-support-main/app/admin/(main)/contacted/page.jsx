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
import { Loader2, RefreshCcwIcon } from "lucide-react";
import contactService from "@/services/contact.service";

const ContactedPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactService.getAllContacts({
        q: search,
        page,
        limit: 10,
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
  }, [page, search]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="container mx-auto py-10">
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
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search by name, email, or subject..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset to first page on search
              }}
              className="max-w-sm"
            />
            <RefreshCcwIcon onClick={() => loadContacts()} />
          </div>

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
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      {/* <TableHead>Last Name</TableHead> */}
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      {/* <TableHead>Business Name</TableHead> */}
                      <TableHead>Subject</TableHead>
                      <TableHead>Page Used for Contacting</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.fullname}</TableCell>
                        {/* <TableCell>{contact.lastName}</TableCell> */}
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        {/* <TableCell>{contact.businessName}</TableCell> */}
                        <TableCell>{contact.subject}</TableCell>
                        <TableCell>{contact.pageUsed}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

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
    </div>
  );
};

export default ContactedPage;
