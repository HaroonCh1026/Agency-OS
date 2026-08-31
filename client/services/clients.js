import { api } from "./api";

export const getClients = (workspaceId) =>
  api(`/workspaces/${workspaceId}/clients`);

export const createClient = (workspaceId, clientData) =>
  api(`/workspaces/${workspaceId}/clients`, {
    method: "POST",
    body: JSON.stringify(clientData),
  });

export const updateClient = (workspaceId, clientId, clientData) =>
  api(`/workspaces/${workspaceId}/clients/${clientId}`, {
    method: "PATCH",
    body: JSON.stringify(clientData),
  });

export const deleteClient = (workspaceId, clientId) =>
  api(`/workspaces/${workspaceId}/clients/${clientId}`, {
    method: "DELETE",
  });
