import ClientCard from "./ClientCard";

export default function ClientList({ clients, onEdit, onDelete }) {
  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-8 text-center">
        <h3 className="text-sm font-medium text-gray-900">No clients found</h3>

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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
