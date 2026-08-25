"use client";

import { use, useState } from "react";

import ClientSection from "./components/ClientSection/ClientSection";
import NotesSection from "./components/NotesSection/NotesSection";

export default function ClientsPage({ params }) {
  const { workspaceId } = use(params);

  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <main className="min-h-full bg-gray-50">
      {/* Page header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <p className="text-sm font-medium text-gray-500">Workspace</p>

          <div className="mt-1 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Clients
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your clients and keep track of their notes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <ClientSection
          workspaceId={workspaceId}
          onClientSelect={setSelectedClient}
        />

        {selectedClient && (
          <div className="mt-8">
            <NotesSection workspaceId={workspaceId} client={selectedClient} />
          </div>
        )}
      </div>
    </main>
  );
}
