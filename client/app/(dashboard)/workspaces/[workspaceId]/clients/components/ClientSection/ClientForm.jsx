"use client";

import { Building2, Globe, Mail, MapPin, Phone, User, X } from "lucide-react";

export default function ClientForm({
  form,
  setForm,
  editingClient,
  loading,
  error,
  onSubmit,
  onCancel,
}) {
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <User className="h-4 w-4 text-gray-600" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {editingClient ? "Edit client" : "Add client"}
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  {editingClient
                    ? "Update the client's information."
                    : "Add a new client to your workspace."}
                </p>
              </div>
            </div>
          </div>

          {editingClient && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Cancel editing"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="p-6">
        <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Client name
            </label>

            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Smith"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Company
            </label>

            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company name"
                value={form.company}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="client@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>

            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+92 300 1234567"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Address
            </label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <input
                id="address"
                name="address"
                type="text"
                placeholder="Street address"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* City */}
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
              placeholder="Lahore"
              value={form.city}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          {/* Country */}
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
              placeholder="Pakistan"
              value={form.country}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Website
            </label>

            <div className="relative">
              <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://example.com"
                value={form.website}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>
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
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
          {editingClient && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? editingClient
                ? "Updating..."
                : "Creating..."
              : editingClient
                ? "Update client"
                : "Add client"}
          </button>
        </div>
      </form>
    </div>
  );
}
