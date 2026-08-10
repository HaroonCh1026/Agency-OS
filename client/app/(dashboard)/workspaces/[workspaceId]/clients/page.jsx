"use client";

import { use, useEffect, useState } from "react";
import { api } from "../../../../../services/api";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  website: "",
  notes: "",
  status: "active",
};

export default function ClientsPage({ params }) {
  const { workspaceId } = use(params);

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    loadClients();
  }, [workspaceId]);

  async function loadClients() {
    const response = await api(`/workspaces/${workspaceId}/clients`);

    if (response.ok) {
      setClients(response.data);
    } else {
      const message =
        response.data?.errors?.join("\n") ||
        response.data?.error ||
        "Failed to load clients.";

      alert(message);
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingClient(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Client name is required.");
      return;
    }

    setLoading(true);

    let response;

    if (editingClient) {
      response = await api(
        `/workspaces/${workspaceId}/clients/${editingClient.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(form),
        },
      );
    } else {
      response = await api(`/workspaces/${workspaceId}/clients`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    setLoading(false);

    if (response.ok) {
      if (editingClient) {
        setClients(
          clients.map((client) =>
            client.id === editingClient.id ? response.data.client : client,
          ),
        );

        alert("Client updated successfully.");
      } else {
        setClients([...clients, response.data.client]);

        alert("Client created successfully.");
      }

      resetForm();
    } else {
      const message =
        response.data?.errors?.join("\n") ||
        response.data?.error ||
        "Something went wrong.";

      alert(message);
    }
  }

  function handleEdit(client) {
    setEditingClient(client);

    setForm({
      name: client.name || "",
      company: client.company || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      city: client.city || "",
      country: client.country || "",
      website: client.website || "",
      notes: client.notes || "",
      status: client.status || "active",
    });
  }

  async function handleDelete(clientId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?",
    );

    if (!confirmed) {
      return;
    }

    const response = await api(
      `/workspaces/${workspaceId}/clients/${clientId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      setClients(clients.filter((client) => client.id !== clientId));

      if (editingClient?.id === clientId) {
        resetForm();
      }

      alert("Client deleted successfully.");
    } else {
      const message =
        response.data?.errors?.join("\n") ||
        response.data?.error ||
        "Failed to delete client.";

      alert(message);
    }
  }

  return (
    <main>
      <h1>Clients</h1>

      <hr />

      <h2>{editingClient ? "Edit Client" : "Add Client"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <br />
        <br />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? editingClient
              ? "Updating..."
              : "Creating..."
            : editingClient
              ? "Update Client"
              : "Create Client"}
        </button>

        {editingClient && (
          <>
            {" "}
            <button type="button" onClick={resetForm} disabled={loading}>
              Cancel
            </button>
          </>
        )}
      </form>

      <hr />

      <h2>Your Clients</h2>

      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.name}</strong>
              <br />
              Company: {client.company || "N/A"}
              <br />
              Email: {client.email || "N/A"}
              <br />
              Phone: {client.phone || "N/A"}
              <br />
              Address: {client.address || "N/A"}
              <br />
              City: {client.city || "N/A"}
              <br />
              Country: {client.country || "N/A"}
              <br />
              Website: {client.website || "N/A"}
              <br />
              Status: {client.status || "N/A"}
              <br />
              Notes: {client.notes || "N/A"}
              <br />
              <br />
              <button type="button" onClick={() => handleEdit(client)}>
                Edit
              </button>{" "}
              <button type="button" onClick={() => handleDelete(client.id)}>
                Delete
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
