"use client";

import { useState } from "react";
import { File, Paperclip, Send, X } from "lucide-react";

const initialForm = {
  title: "",
  content: "",
  note_type: "general",
};

export default function NoteForm({ loading, error, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const removeFile = (index) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("note_type", form.note_type);

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    const success = await onSubmit(formData);

    if (success) {
      setForm(initialForm);
      setFiles([]);
      event.currentTarget.reset();
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-900">Add a note</h3>

        <p className="mt-1 text-sm text-gray-500">
          Add information, meeting details, or files for this client.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-[1fr_180px]">
          <div>
            <label
              htmlFor="note-title"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="note-title"
              name="title"
              type="text"
              placeholder="Meeting with client"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          <div>
            <label
              htmlFor="note-type"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Type
            </label>

            <select
              id="note-type"
              name="note_type"
              value={form.note_type}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="general">General</option>
              <option value="meeting">Meeting</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="task">Task</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="note-content"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Note
          </label>

          <textarea
            id="note-content"
            name="content"
            rows={5}
            placeholder="Write your note here..."
            value={form.content}
            onChange={handleChange}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="note-files"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Attach files
          </label>

          <label
            htmlFor="note-files"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-5 py-6 text-center transition hover:border-gray-400 hover:bg-gray-50 ${
              loading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-700">
              Choose files
            </p>

            <p className="mt-1 text-xs text-gray-500">
              You can attach multiple files
            </p>

            <input
              id="note-files"
              name="files"
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={loading}
              className="sr-only"
            />
          </label>

          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <File className="h-4 w-4 shrink-0 text-gray-500" />

                    <span className="truncate text-sm text-gray-700">
                      {file.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={loading}
                    className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-white hover:text-gray-700"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />

            {loading ? "Creating..." : "Add note"}
          </button>
        </div>
      </form>
    </div>
  );
}