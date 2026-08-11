"use client";

import { use, useEffect, useState } from "react";
import { api } from "../../../../../services/api";

import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";

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

  // =========================
  // Load Clients
  // =========================

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

  // =========================
  // Reset Form
  // =========================

  function resetForm() {
    setForm(emptyForm);
    setEditingClient(null);
  }

  // =========================
  // Create / Update Client
  // =========================

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

  // =========================
  // Edit Client
  // =========================

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

  // =========================
  // Delete Client
  // =========================

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

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage the clients in this workspace.
        </p>
      </div>

      {/* Client Form */}
      <div className="mb-8">
        <ClientForm
          form={form}
          setForm={setForm}
          editingClient={editingClient}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </div>

      {/* Client List */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Your Clients
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {clients.length} {clients.length === 1 ? "client" : "clients"}
            </p>
          </div>
        </div>

        <ClientList
          clients={clients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
