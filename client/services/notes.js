import api from "./api";

export const getNotes = (workspaceId, clientId) =>
  api.get(`/workspaces/${workspaceId}/clients/${clientId}/notes`);

export const createNote = (workspaceId, clientId, formData) =>
  api.post(`/workspaces/${workspaceId}/clients/${clientId}/notes`, formData);

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
