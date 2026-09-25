import api from "./api";

export async function getBriefingDocuments(workspaceId, clientId) {
  return api.get(
    `/workspaces/${workspaceId}/clients/${clientId}/briefing_documents`,
  );
}
