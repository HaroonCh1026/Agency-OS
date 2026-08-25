"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function SelectedClient({ client, onEdit, onDelete }) {
  if (!client) {
    return null;
  }

  const location = [client.city, client.country].filter(Boolean).join(", ");

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Selected Client</p>

          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            {client.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {[client.company, client.email, location]
              .filter(Boolean)
              .join(" • ")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(client)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(client.id)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-4">
        <p className="text-sm text-gray-500">
          Client notes and activity are shown below.
        </p>
      </div>
    </section>
  );
}
