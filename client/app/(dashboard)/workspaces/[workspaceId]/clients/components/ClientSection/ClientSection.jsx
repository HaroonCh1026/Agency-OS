"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getApiErrorMessage } from "@/services/apiErrors";

import ClientForm from "./ClientForm";
import ClientList from "./ClientList";

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
};

export default function ClientSection({
  workspaceId,
  selectedClient,
  onClientSelect,
}) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [editingClient, setEditingClient] = useState(null);

  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const loadClients = async () => {
    setLoading(true);
    setError("");

    const response = await api(`/workspaces/${workspaceId}/clients`);

    if (response.ok) {
      setClients(response.data);
    } else {
      setError(getApiErrorMessage(response, "Failed to load clients."));
    }

    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, [workspaceId]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingClient(null);
    setFormError("");
  };

  const handleSelect = (client) => {
    onClientSelect?.(client);
  };

  const handleSubmit = async (event) => {
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

      if (!response.ok) {
        setFormError(
          getApiErrorMessage(
            response,
            editingClient
              ? "Unable to update client."
              : "Unable to create client.",
          ),
        );

        return;
      }

      const savedClient = response.data.client;

      if (editingClient) {
        setClients((currentClients) =>
          currentClients.map((client) =>
            client.id === savedClient.id ? savedClient : client,
          ),
        );

        setEditingClient(savedClient);
        onClientSelect?.(savedClient);
      } else {
        setClients((currentClients) => [...currentClients, savedClient]);
        resetForm();
      }
    } catch (error) {
      console.error("Client request failed:", error);

      setFormError(
        editingClient
          ? "Unable to update client. Please try again."
          : "Unable to create client. Please try again.",
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (client) => {
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
    });

    setFormError("");
    onClientSelect?.(client);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (clientId) => {
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

    if (!response.ok) {
      setError(getApiErrorMessage(response, "Failed to delete client."));
      return;
    }

    setClients((currentClients) =>
      currentClients.filter((client) => client.id !== clientId),
    );

    if (selectedClient?.id === clientId) {
      onClientSelect?.(null);
    }

    if (editingClient?.id === clientId) {
      resetForm();
    }
  };

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
