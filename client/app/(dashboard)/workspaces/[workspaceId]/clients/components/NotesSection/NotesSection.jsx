"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getNotes, createNote, normalizeNotes } from "@/services/notes";
import { getApiErrorMessage } from "@/services/apiErrors";
import { createCableConsumer } from "@/services/cable";

import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import AiSection from "./AiSection";

export default function NotesSection({ workspaceId, client }) {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteFormLoading, setNoteFormLoading] = useState(false);
  const [noteError, setNoteError] = useState("");

  const addNoteIfNew = (newNote) => {
    if (!newNote?.id) {
      return;
    }

    setNotes((currentNotes) => {
      const noteId = String(newNote.id);

      const exists = currentNotes.some(
        (note) => note?.id && String(note.id) === noteId,
      );

      if (exists) {
        return currentNotes;
      }

      return [newNote, ...currentNotes];
    });
  };

  const loadNotes = async () => {
    if (!client) {
      setNotes([]);
      return;
    }

    setNotesLoading(true);
    setNoteError("");

    const response = await getNotes(workspaceId, client.id);

    if (response.ok) {
      setNotes(normalizeNotes(response.data));
    } else {
      setNotes([]);
      setNoteError(getApiErrorMessage(response, "Failed to load notes."));
    }

    setNotesLoading(false);
  };

  useEffect(() => {
    if (!client) {
      setNotes([]);
      setNoteError("");
      return;
    }

    loadNotes();
  }, [workspaceId, client?.id]);

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
        connected: () => {
          console.log("Connected to NotesChannel");
        },

        disconnected: () => {
          console.log("Disconnected from NotesChannel");
        },

        rejected: () => {
          console.error("NotesChannel subscription rejected");
        },

        received: (data) => {
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

  const handleCreateNote = async (formData) => {
    if (!client) {
      setNoteError("Please select a client first.");
      return false;
    }

    setNoteFormLoading(true);
    setNoteError("");

    try {
      const response = await createNote(workspaceId, client.id, formData);

      if (response.ok) {
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
  };

  if (!client) {
    return null;
  }

  return (
    <>
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <FileText className="h-4 w-4 text-gray-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Notes & Activity
              </h2>

              <p className="mt-0.5 text-sm text-gray-500">
                Keep track of conversations and important client details.
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100 px-6 py-6">
          <NoteForm
            loading={noteFormLoading}
            error={noteError}
            onSubmit={handleCreateNote}
          />
        </div>

        <div className="px-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Recent notes
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>

          {notesLoading ? (
            <div className="space-y-3">
              <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
            </div>
          ) : (
            <NoteList notes={notes} />
          )}
        </div>
      </section>

      <AiSection workspaceId={workspaceId} client={client} />
    </>
  );
}
