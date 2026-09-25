class BriefingDocumentsController < ApplicationController
  before_action :authenticate_user

  def index
    workspace = @current_user.workspaces.find_by(id: params[:workspace_id])

    unless workspace
      render json: { error: "Workspace not found" }, status: :not_found
      return
    end

    client = workspace.clients.find_by(id: params[:client_id])

    unless client
      render json: { error: "Client not found" }, status: :not_found
      return
    end

    briefing_documents = client.briefing_documents.order(created_at: :desc)

    render json: briefing_documents, status: :ok
  end
end
