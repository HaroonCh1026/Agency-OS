"use client";

import {
  Building2,
  ChevronRight,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";

const ClientCard = ({ client, selected, onSelect, onEdit, onDelete }) => {
  const location = [client.city, client.country].filter(Boolean).join(", ");

  const handleSelect = () => {
    onSelect(client);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(client);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(client.id);
  };

  return (
    <article
      onClick={handleSelect}
      className={`group cursor-pointer rounded-2xl border bg-white p-5 transition ${
        selected
          ? "border-gray-900 shadow-md"
          : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
      }`}
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              selected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {client.name}
            </h3>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {client.company || "No company"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            client.status === "active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {client.status || "N/A"}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-2.5">
        {client.email && (
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <Mail className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{client.email}</span>
          </div>
        )}

        {client.phone && (
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <Phone className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{client.phone}</span>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={handleSelect}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-gray-900"
        >
          View client
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleEdit}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label={`Edit ${client.name}`}
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${client.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ClientCard;
