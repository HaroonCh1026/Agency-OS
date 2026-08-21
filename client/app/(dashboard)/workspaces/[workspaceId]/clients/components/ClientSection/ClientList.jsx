import ClientCard from "./ClientCard";

export default function ClientList({
  clients,
  selectedClient,
  onSelect,
  onEdit,
  onDelete,
}) {
  if (clients.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
        <h3 className="text-sm font-semibold text-gray-900">
          No clients found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add your first client to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          selected={selectedClient?.id === client.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
