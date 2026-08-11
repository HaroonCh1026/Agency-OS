"use client";

import { useEffect, useState } from "react";
import { api } from "../../../services/api";

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
    try {
      const response = await api("/workspaces");

      if (response.ok) {
        setWorkspaces(response.data);
      } else {
        setError("Unable to load workspaces.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading workspaces.");
    } finally {
      setLoading(false);
    }
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

    if (!form.name.trim()) {
      alert("Workspace name is required.");
      return;
    }

    setFormLoading(true);

    let response;

    try {
      if (editingWorkspace) {
        response = await api(`/workspaces/${editingWorkspace.id}`, {
          method: "PATCH",
          body: JSON.stringify(form),
        });
      } else {
        response = await api("/workspaces", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      if (response.ok) {
        if (editingWorkspace) {
          setWorkspaces(
            workspaces.map((workspace) =>
              workspace.id === editingWorkspace.id
                ? response.data.workspace
                : workspace,
            ),
          );

          alert("Workspace updated successfully.");
        } else {
          setWorkspaces([...workspaces, response.data.workspace]);

          alert("Workspace created successfully.");
        }

        resetForm();
      } else {
        const message =
          response.data?.errors?.join("\n") ||
          response.data?.error ||
          "Something went wrong.";

        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
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

    try {
      const response = await api(`/workspaces/${workspaceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkspaces(
          workspaces.filter((workspace) => workspace.id !== workspaceId),
        );

        if (editingWorkspace?.id === workspaceId) {
          resetForm();
        }

        alert("Workspace deleted successfully.");
      } else {
        const message =
          response.data?.errors?.join("\n") ||
          response.data?.error ||
          "Failed to delete workspace.";

        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting workspace.");
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
