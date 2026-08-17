export default function NoteList({ notes }) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white p-8 text-center">
        <h3 className="text-sm font-medium text-gray-900">No notes found</h3>

        <p className="mt-1 text-sm text-gray-500">
          Add the first note for this client.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <article
          key={note.id}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{note.title}</h3>

              <p className="mt-1 text-xs uppercase text-gray-500">
                {note.note_type}
              </p>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-line text-sm text-gray-600">
            {note.content}
          </p>

          {note.files?.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Attachments
              </p>

              <div className="space-y-1">
                {note.files.map((file) => (
                  <p
                    key={file.id || file.filename}
                    className="text-sm text-gray-500"
                  >
                    📎 {file.filename}
                  </p>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
