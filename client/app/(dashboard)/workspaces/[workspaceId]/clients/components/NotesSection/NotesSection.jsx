"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getApiErrorMessage } from "@/services/apiErrors";
import { createCableConsumer } from "@/services/cable";

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

export default function NotesSection({ workspaceId, client }) {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteFormLoading, setNoteFormLoading] = useState(false);
  const [noteError, setNoteError] = useState("");

  // --------------------------------------------------
  // Remove duplicate notes
  // --------------------------------------------------

  function normalizeNotes(noteList) {
    if (!Array.isArray(noteList)) {
      return [];
    }

    const uniqueNotes = [];
    const seenIds = new Set();

    for (const note of noteList) {
      if (!note || note.id === undefined || note.id === null) {
        continue;
      }

      const noteId = String(note.id);

      if (seenIds.has(noteId)) {
        continue;
      }

      seenIds.add(noteId);
      uniqueNotes.push(note);
    }

    return uniqueNotes;
  }

  // --------------------------------------------------
  // Add note safely
  // --------------------------------------------------

  function addNoteIfNew(newNote) {
    if (!newNote || newNote.id === undefined || newNote.id === null) {
      return;
    }

    setNotes((currentNotes) => {
      const newNoteId = String(newNote.id);

      const alreadyExists = currentNotes.some(
        (note) =>
          note &&
          note.id !== undefined &&
          note.id !== null &&
          String(note.id) === newNoteId,
      );

      if (alreadyExists) {
        return currentNotes;
      }

      return [newNote, ...currentNotes];
    });
  }

  // --------------------------------------------------
  // Load notes
  // --------------------------------------------------

  async function loadNotes() {
    if (!client) {
      setNotes([]);
      return;
    }

    setNotesLoading(true);
    setNoteError("");

    const response = await api(
      `/workspaces/${workspaceId}/clients/${client.id}/notes`,
    );

    if (response.ok) {
      setNotes(normalizeNotes(response.data));
    } else {
      setNotes([]);
      setNoteError(getApiErrorMessage(response, "Failed to load notes."));
    }

    setNotesLoading(false);
  }

  // --------------------------------------------------
  // Load notes whenever selected client changes
  // --------------------------------------------------

  useEffect(() => {
    if (!client) {
      setNotes([]);
      setNoteError("");
      return;
    }

    loadNotes();
  }, [workspaceId, client?.id]);

  // --------------------------------------------------
  // Action Cable
  // --------------------------------------------------

  useEffect(() => {
    if (!client) {
      return;
    }

    const consumer = createCableConsumer();

    if (!consumer) {
      return;
    }

    const subscription = consumer.subscriptions.create(
      {
        channel: "NotesChannel",
        workspace_id: workspaceId,
        client_id: client.id,
      },
      {
        connected() {
          console.log("Connected to NotesChannel");
        },

        disconnected() {
          console.log("Disconnected from NotesChannel");
        },

        rejected() {
          console.error("NotesChannel subscription rejected");
        },

        received(data) {
          console.log("Received Action Cable data:", data);

          if (data.type === "note_created") {
            addNoteIfNew(data.note);
          }
        },
      },
    );

    return () => {
      subscription.unsubscribe();
      consumer.disconnect();
    };
  }, [workspaceId, client?.id]);

  // --------------------------------------------------
  // Create note
  // --------------------------------------------------

  async function handleCreateNote(formData) {
    if (!client) {
      setNoteError("Please select a client first.");
      return false;
    }

    setNoteFormLoading(true);
    setNoteError("");

    try {
      const response = await api(
        `/workspaces/${workspaceId}/clients/${client.id}/notes`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        // Add the HTTP response.
        //
        // If Action Cable sends the same note,
        // addNoteIfNew() prevents duplication.
        addNoteIfNew(response.data.note);

        return true;
      }

      setNoteError(getApiErrorMessage(response, "Unable to create note."));

      return false;
    } catch (error) {
      console.error("Create note failed:", error);

      setNoteError("Unable to create note. Please try again.");

      return false;
    } finally {
      setNoteFormLoading(false);
    }
  }

  // --------------------------------------------------
  // Nothing selected
  // --------------------------------------------------

  if (!client) {
    return null;
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <section className="mt-10 border-t pt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notes</h2>

        <p className="mt-1 text-sm text-gray-500">
          Notes for{" "}
          <span className="font-medium text-gray-700">{client.name}</span>
        </p>
      </div>

      {/* Note Form */}
      <div className="mb-8">
        <NoteForm
          loading={noteFormLoading}
          error={noteError}
          onSubmit={handleCreateNote}
        />
      </div>

      {/* Notes List */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Client Notes</h3>

          <p className="mt-1 text-sm text-gray-500">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {notesLoading ? (
          <div className="space-y-4">
            <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
          </div>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </section>
  );
}
