"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function SelectedClient({ client, onEdit, onDelete }) {
  if (!client) {
    return null;
  }

  const location = [client.city, client.country].filter(Boolean).join(", ");

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">Selected Client</p>

          <h2 className="mt-1 wrap-break-word text-xl font-semibold text-gray-900">
            {client.name}
          </h2>

          <p className="mt-1 wrap-break-word text-sm leading-5 text-gray-500">
            {[client.company, client.email, location]
              .filter(Boolean)
              .join(" • ")}
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => onEdit(client)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none"
          >
            <Pencil className="h-4 w-4 shrink-0" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(client.id)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:flex-none"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Delete
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
        <p className="text-sm leading-5 text-gray-500">
          Client notes and activity are shown below.
        </p>
      </div>
    </section>
  );
}
