export default function ClientCard({ client, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {client.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {client.company || "No company"}
          </p>
        </div>

        {/* Status */}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            client.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {client.status || "N/A"}
        </span>
      </div>

      {/* Client Information */}
      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="font-medium text-gray-700">Email:</span>{" "}
          <span className="text-gray-500">{client.email || "N/A"}</span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Phone:</span>{" "}
          <span className="text-gray-500">{client.phone || "N/A"}</span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Location:</span>{" "}
          <span className="text-gray-500">
            {[client.city, client.country].filter(Boolean).join(", ") || "N/A"}
          </span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Website:</span>{" "}
          <span className="text-gray-500">{client.website || "N/A"}</span>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-2 border-t pt-4">
        <button
          type="button"
          onClick={() => onEdit(client)}
          className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(client.id)}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
