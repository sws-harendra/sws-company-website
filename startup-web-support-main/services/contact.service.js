import { API_URL } from "@/constants";

// /services/contact.service.js
const contactService = {
  // Get all contacts
  async getAllContacts({
    page = 1,
    limit = 10,
    q = "",
    sortBy = "createdAt",
    order = "DESC",
    startDate,
    endDate,
  } = {}) {
    const params = new URLSearchParams({
      page,
      limit,
      q,
      sortBy,
      order,
      startDate,
      endDate,
    });
    const res = await fetch(`${API_URL}/contacts?${params}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Error fetching contacts`);
    return res.json();
  },
  // Get one contact by ID
  async getContactById(id) {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Error fetching contact ID ${id}`);
    }
    return res.json();
  },

  // Create a new contact
  async createContact(contactData) {
    const res = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    if (!res.ok) {
      throw new Error(`Error creating contact`);
    }
    return res.json();
  },

  // Delete a contact
  async deleteContact(id) {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Error deleting contact`);
    }
    return res.json();
  },
};

export default contactService;
