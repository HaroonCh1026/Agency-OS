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

    briefing_document = client.briefing_documents.create!(
      question: question,
      content: { answer: answer }
    )

    render json: {
      answer: answer,
      briefing_document: briefing_document
    }, status: :ok
  rescue NoteAiService::Error => e
    render json: { error: e.message }, status: :bad_gateway
  end
end
