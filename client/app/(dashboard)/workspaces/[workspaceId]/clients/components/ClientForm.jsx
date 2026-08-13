"use client";

export default function ClientForm({
  form,
  setForm,
  editingClient,
  loading,
  error,
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
          {editingClient ? "Edit Client" : "Add Client"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {editingClient
            ? "Update the client information below."
            : "Add a new client to this workspace."}
        </p>
      </div>

      {/* Form Error */}
      {error && (
        <div
          role="alert"
          className="mb-6 whitespace-pre-line rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Client name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company name"
            value={form.company}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="client@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Address
          </label>

          <input
            id="address"
            name="address"
            type="text"
            placeholder="Street address"
            value={form.address}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* City + Country */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="city"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Country
            </label>

            <input
              id="country"
              name="country"
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="website"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Website
          </label>

          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Additional notes..."
            value={form.notes}
            onChange={handleChange}
            disabled={loading}
            className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? editingClient
                ? "Updating..."
                : "Creating..."
              : editingClient
                ? "Update Client"
                : "Create Client"}
          </button>

          {editingClient && (
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
