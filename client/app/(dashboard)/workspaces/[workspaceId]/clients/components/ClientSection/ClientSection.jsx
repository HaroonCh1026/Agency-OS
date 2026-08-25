"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getApiErrorMessage } from "@/services/apiErrors";

import ClientForm from "./ClientForm";
import ClientList from "./ClientList";

export default function ClientSection({
  workspaceId,
  selectedClient,
  onClientSelect,
}) {
  const emptyForm = {
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    website: "",
    status: "active",
    notes: "",
  };

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [editingClient, setEditingClient] = useState(null);

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  // Load clients
  useEffect(() => {
    loadClients();
  }, [workspaceId]);

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

  // Reset form
  function resetForm() {
    setForm(emptyForm);
    setEditingClient(null);
    setFormError("");
  }

  // Select client
  function handleSelect(client) {
    if (onClientSelect) {
      onClientSelect(client);
    }
  }

  // Create / Update client
  async function handleSubmit(event) {
    event.preventDefault();

    setFormError("");

    if (!form.name.trim()) {
      setFormError("Client name is required.");
      return;
    }

    setFormLoading(true);

    const clientData = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      country: form.country,
      website: form.website,
      status: form.status,
    };

    try {
      const response = editingClient
        ? await api(`/workspaces/${workspaceId}/clients/${editingClient.id}`, {
            method: "PATCH",
            body: JSON.stringify(clientData),
          })
        : await api(`/workspaces/${workspaceId}/clients`, {
            method: "POST",
            body: JSON.stringify(clientData),
          });

      if (response.ok) {
        if (editingClient) {
          const updatedClient = response.data.client;

          setClients((currentClients) =>
            currentClients.map((client) =>
              client.id === editingClient.id ? updatedClient : client,
            ),
          );

          setEditingClient(updatedClient);

          if (onClientSelect) {
            onClientSelect(updatedClient);
          }
        } else {
          const newClient = response.data.client;

          setClients((currentClients) => [...currentClients, newClient]);

          resetForm();
        }
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

  // Edit client
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
      status: client.status || "active",
      notes: client.notes || "",
    });

    setFormError("");

    if (onClientSelect) {
      onClientSelect(client);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete client
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

      if (selectedClient?.id === clientId && onClientSelect) {
        onClientSelect(null);
      }

      if (editingClient?.id === clientId) {
        resetForm();
      }
    } else {
      setError(getApiErrorMessage(response, "Failed to delete client."));
    }
  }

  // Loading
  if (loading) {
    return (
      <section className="space-y-6">
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
      </section>
    );
  }

  return (
    <section>
      {/* Error */}
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
      <div>
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
          selectedClient={selectedClient}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
