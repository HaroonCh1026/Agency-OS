import api from "./api";

export const getClients = (workspaceId) =>
  api.get(`/workspaces/${workspaceId}/clients`);

export const createClient = (workspaceId, clientData) =>
  api.post(`/workspaces/${workspaceId}/clients`, clientData);

export const updateClient = (workspaceId, clientId, clientData) =>
  api.patch(`/workspaces/${workspaceId}/clients/${clientId}`, clientData);

export const deleteClient = (workspaceId, clientId) =>
  api.delete(`/workspaces/${workspaceId}/clients/${clientId}`);