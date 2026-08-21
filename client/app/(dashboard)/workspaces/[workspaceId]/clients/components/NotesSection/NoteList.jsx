"use client";

import {
  CalendarDays,
  File,
  FileText,
  Mail,
  Phone,
  ClipboardList,
} from "lucide-react";

const noteIcons = {
  general: FileText,
  meeting: CalendarDays,
  call: Phone,
  email: Mail,
  task: ClipboardList,
};

export default function NoteList({ notes }) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
          <FileText className="h-5 w-5 text-gray-500" />
        </div>

        <h3 className="mt-3 text-sm font-semibold text-gray-900">
          No notes yet
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add a note to keep track of client activity.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => {
        const Icon = noteIcons[note.note_type] || FileText;

        return (
          <article
            key={note.id}
            className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300"
          >
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Icon className="h-4 w-4 text-gray-600" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {note.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium capitalize text-gray-400">
                      {note.note_type || "general"}
                    </p>
                  </div>

                  {note.created_at && (
                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-400">
                      <CalendarDays className="h-3.5 w-3.5" />

                      <span>
                        {new Date(note.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-600">
                  {note.content}
                </p>

                {note.files?.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      Attachments
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {note.files.map((file) => (
                        <div
                          key={file.id || file.filename}
                          className="inline-flex max-w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                          <File className="h-4 w-4 shrink-0 text-gray-500" />

                          <span className="max-w-[220px] truncate text-xs text-gray-600">
                            {file.filename}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
