import api from "./api";

export async function askClientAi(workspaceId, clientId, question) {
  return api.post(`/workspaces/${workspaceId}/clients/${clientId}/ai`, {
    question,
  });
}
