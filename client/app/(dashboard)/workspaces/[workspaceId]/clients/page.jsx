"use client";

import { use, useState } from "react";

import ClientSection from "./components/ClientSection/ClientSection";
import NotesSection from "./components/NotesSection/NotesSection";

export default function ClientsPage({ params }) {
  const { workspaceId } = use(params);

  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <main className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage the clients in this workspace.
        </p>
      </div>

      {/* Clients */}
      <ClientSection
        workspaceId={workspaceId}
        onClientSelect={setSelectedClient}
      />

      {/* Notes */}
      {selectedClient && (
        <NotesSection workspaceId={workspaceId} client={selectedClient} />
      )}
    </main>
  );
}
