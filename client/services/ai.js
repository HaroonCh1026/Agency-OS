import { api } from "./api";

export async function askClientAi(workspaceId, clientId, question) {
  return api(`/workspaces/${workspaceId}/clients/${clientId}/ai`, {
    method: "POST",
    body: JSON.stringify({
      question,
    }),
  });
}
