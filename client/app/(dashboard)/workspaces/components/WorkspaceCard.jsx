"use client";

import Link from "next/link";

export default function WorkspaceCard({ workspace, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Workspace Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {workspace.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Workspace #{workspace.id}
          </p>
        </div>
      </div>

      {/* Open Workspace */}
      <Link
        href={`/workspaces/${workspace.id}/clients`}
        className="mt-5 block rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Open Workspace
      </Link>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(workspace)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(workspace.id)}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
