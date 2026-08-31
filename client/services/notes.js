import { api } from "./api";

export const getNotes = (workspaceId, clientId) =>
  api(`/workspaces/${workspaceId}/clients/${clientId}/notes`);

export const createNote = (workspaceId, clientId, formData) =>
  api(`/workspaces/${workspaceId}/clients/${clientId}/notes`, {
    method: "POST",
    body: formData,
  });

export const normalizeNotes = (noteList) => {
  if (!Array.isArray(noteList)) {
    return [];
  }

  return noteList
    .filter((note) => note?.id)
    .reduce((uniqueNotes, note) => {
      const exists = uniqueNotes.some(
        (existingNote) => existingNote.id === note.id,
      );

      return exists ? uniqueNotes : [...uniqueNotes, note];
    }, []);
};
