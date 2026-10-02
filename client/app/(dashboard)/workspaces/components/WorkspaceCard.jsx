"use client";

import Link from "next/link";

export default function WorkspaceCard({ workspace, onEdit, onDelete }) {
  return (
    <div className="min-w-0 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      {/* Workspace Header */}
      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="wrap-break-word text-lg font-semibold text-gray-900">
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
        className="mt-5 block w-full rounded-lg bg-gray-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Open Workspace
      </Link>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(workspace)}
          className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(workspace.id)}
          className="min-w-0 flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}