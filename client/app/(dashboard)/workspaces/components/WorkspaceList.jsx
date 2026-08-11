import WorkspaceCard from "./WorkspaceCard";

export default function WorkspaceList({ workspaces, onEdit, onDelete }) {
  if (workspaces.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-8 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          No workspaces found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Create your first workspace to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          workspace={workspace}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
