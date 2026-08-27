class AiController < ApplicationController
  before_action :authenticate_user

  def create
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

    question = params[:question]

    unless question
      render json: { error: "Question parameter is required" }, status: :bad_request
      return
    end

    answer = NoteAiService.new(client, question).call

    render json: { answer: answer }, status: :ok
  end
end