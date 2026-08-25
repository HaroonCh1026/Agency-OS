"use client";

export default function WorkspaceForm({
  form,
  setForm,
  editingWorkspace,
  loading,
  onSubmit,
  onCancel,
}) {
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {editingWorkspace ? "Edit Workspace" : "Create Workspace"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {editingWorkspace
            ? "Update the workspace name."
            : "Create a new workspace for your agency."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Workspace Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Marketing Team"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? editingWorkspace
                ? "Updating..."
                : "Creating..."
              : editingWorkspace
                ? "Update Workspace"
                : "Create Workspace"}
          </button>

          {editingWorkspace && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
