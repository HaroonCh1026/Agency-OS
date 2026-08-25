"use client";

import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { getApiErrorMessage } from "../../../services/apiErrors";

import WorkspaceForm from "./components/WorkspaceForm";
import WorkspaceList from "./components/WorkspaceList";

const emptyForm = {
  name: "",
};

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingWorkspace, setEditingWorkspace] = useState(null);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Load Workspaces
  // =========================

  useEffect(() => {
    loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    setLoading(true);
    setError("");

    const response = await api("/workspaces");

    if (response.ok) {
      setWorkspaces(response.data);
    } else {
      setError(getApiErrorMessage(response, "Unable to load workspaces."));
    }

    setLoading(false);
  }

  // =========================
  // Reset Form
  // =========================

  function resetForm() {
    setForm(emptyForm);
    setEditingWorkspace(null);
  }

  // =========================
  // Create / Update
  // =========================

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      alert("Workspace name is required.");
      return;
    }

    setFormLoading(true);

    try {
      const response = editingWorkspace
        ? await api(`/workspaces/${editingWorkspace.id}`, {
            method: "PATCH",
            body: JSON.stringify(form),
          })
        : await api("/workspaces", {
            method: "POST",
            body: JSON.stringify(form),
          });

      if (response.ok) {
        if (editingWorkspace) {
          setWorkspaces((currentWorkspaces) =>
            currentWorkspaces.map((workspace) =>
              workspace.id === editingWorkspace.id
                ? response.data.workspace
                : workspace,
            ),
          );

          alert("Workspace updated successfully.");
        } else {
          setWorkspaces((currentWorkspaces) => [
            ...currentWorkspaces,
            response.data.workspace,
          ]);

          alert("Workspace created successfully.");
        }

        resetForm();
      } else {
        alert(
          getApiErrorMessage(
            response,
            editingWorkspace
              ? "Unable to update workspace."
              : "Unable to create workspace.",
          ),
        );
      }
    } finally {
      setFormLoading(false);
    }
  }

  // =========================
  // Edit Workspace
  // =========================

  function handleEdit(workspace) {
    setEditingWorkspace(workspace);

    setForm({
      name: workspace.name || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================
  // Delete Workspace
  // =========================

  async function handleDelete(workspaceId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workspace?",
    );

    if (!confirmed) {
      return;
    }

    const response = await api(`/workspaces/${workspaceId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setWorkspaces((currentWorkspaces) =>
        currentWorkspaces.filter((workspace) => workspace.id !== workspaceId),
      );

      if (editingWorkspace?.id === workspaceId) {
        resetForm();
      }

      alert("Workspace deleted successfully.");
    } else {
      alert(getApiErrorMessage(response, "Failed to delete workspace."));
    }
  }

  // =========================
  // Loading UI
  // =========================

  if (loading) {
    return (
      <main className="min-h-full bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div>
            <div className="h-8 w-40 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-64 rounded bg-gray-200" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-48 rounded-xl bg-gray-200" />
            <div className="h-48 rounded-xl bg-gray-200" />
            <div className="h-48 rounded-xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Main UI
  // =========================

  return (
    <main className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Management</p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">Workspaces</h1>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage your agency workspaces.
          </p>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}

          <button
            type="button"
            onClick={loadWorkspaces}
            className="ml-3 font-medium underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Workspace Form */}
      <div className="mb-8">
        <WorkspaceForm
          form={form}
          setForm={setForm}
          editingWorkspace={editingWorkspace}
          loading={formLoading}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </div>

      {/* Summary */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Workspaces</p>

        <p className="mt-1 text-2xl font-bold text-gray-900">
          {workspaces.length}
        </p>
      </div>

      {/* Workspace List */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Workspaces
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select a workspace to manage its clients.
          </p>
        </div>

        <WorkspaceList
          workspaces={workspaces}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
