"use client";

import { use, useEffect, useState } from "react";
import { api } from "../../../../../services/api";
import { getApiErrorMessage } from "../../../../../services/apiErrors";

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

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [editingClient, setEditingClient] = useState(null);

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadClients();
  }, [workspaceId]);

  // =========================
  // Load Clients
  // =========================

  async function loadClients() {
    setLoading(true);
    setError("");

    const response = await api(`/workspaces/${workspaceId}/clients`);

    if (response.ok) {
      setClients(response.data);
    } else {
      setError(getApiErrorMessage(response, "Failed to load clients."));
    }

    setLoading(false);
  }

  // =========================
  // Reset Form
  // =========================

  function resetForm() {
    setForm(emptyForm);
    setEditingClient(null);
    setFormError("");
  }

  // =========================
  // Create / Update Client
  // =========================

  async function handleSubmit(event) {
    event.preventDefault();

    setFormError("");

    // Frontend validation
    if (!form.name.trim()) {
      setFormError("Client name is required.");
      return;
    }

    setFormLoading(true);

    try {
      const response = editingClient
        ? await api(`/workspaces/${workspaceId}/clients/${editingClient.id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
          })
        : await api(`/workspaces/${workspaceId}/clients`, {
            method: "POST",
            body: JSON.stringify(form),
          });

      if (response.ok) {
        if (editingClient) {
          setClients((currentClients) =>
            currentClients.map((client) =>
              client.id === editingClient.id ? response.data.client : client,
            ),
          );
        } else {
          setClients((currentClients) => [
            ...currentClients,
            response.data.client,
          ]);
        }

        resetForm();
      } else {
        setFormError(
          getApiErrorMessage(
            response,
            editingClient
              ? "Unable to update client."
              : "Unable to create client.",
          ),
        );
      }
    } finally {
      setFormLoading(false);
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

    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
      setClients((currentClients) =>
        currentClients.filter((client) => client.id !== clientId),
      );

      if (editingClient?.id === clientId) {
        resetForm();
      }
    } else {
      setError(getApiErrorMessage(response, "Failed to delete client."));
    }
  }

  // =========================
  // Initial Loading UI
  // =========================

  if (loading) {
    return (
      <main className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div>
            <div className="h-8 w-32 rounded bg-gray-200" />

            <div className="mt-2 h-4 w-64 rounded bg-gray-200" />
          </div>

          <div className="h-72 rounded-xl bg-gray-200" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-64 rounded-xl bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200" />
            <div className="h-64 rounded-xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Main UI
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

      {/* API Error */}
      {error && (
        <div className="mb-6 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>

          <button
            type="button"
            onClick={loadClients}
            className="font-medium underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Client Form */}
      <div className="mb-8">
        <ClientForm
          form={form}
          setForm={setForm}
          editingClient={editingClient}
          loading={formLoading}
          error={formError}
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
