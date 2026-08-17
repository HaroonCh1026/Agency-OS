"use client";

import { useState } from "react";

const initialForm = {
  title: "",
  content: "",
  note_type: "general",
};

export default function NoteForm({ loading, error, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleFileChange(event) {
    setFiles(Array.from(event.target.files));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    if (!form.content.trim()) {
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

      // Reset file input
      event.target.reset();
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Add Note</h2>

        <p className="mt-1 text-sm text-gray-500">
          Add a note and attach one or more files to this client.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 whitespace-pre-line rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
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
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Note Type */}
        <div>
          <label
            htmlFor="note-type"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Note Type
          </label>

          <select
            id="note-type"
            name="note_type"
            value={form.note_type}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="general">General</option>
            <option value="meeting">Meeting</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="task">Task</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="note-content"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Content
          </label>

          <textarea
            id="note-content"
            name="content"
            rows={5}
            placeholder="Write your note..."
            value={form.content}
            onChange={handleChange}
            disabled={loading}
            className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Files */}
        <div>
          <label
            htmlFor="note-files"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Attach Files
          </label>

          <input
            id="note-files"
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full rounded-lg border bg-white px-3 py-2 text-sm"
          />

          {files.length > 0 && (
            <div className="mt-3 space-y-1">
              {files.map((file) => (
                <p
                  key={`${file.name}-${file.lastModified}`}
                  className="text-sm text-gray-500"
                >
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}
