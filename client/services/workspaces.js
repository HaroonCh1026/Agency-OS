import api from "./api";

export const getWorkspaces = () => api.get("/workspaces");

export const createWorkspace = (workspaceData) =>
  api.post("/workspaces", workspaceData);

export const updateWorkspace = (workspaceId, workspaceData) =>
  api.patch(`/workspaces/${workspaceId}`, workspaceData);

export const deleteWorkspace = (workspaceId) =>
  api.delete(`/workspaces/${workspaceId}`);
