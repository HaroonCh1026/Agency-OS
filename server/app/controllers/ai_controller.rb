class AiController < ApplicationController
  before_action :authenticate_user

  MAX_QUESTION_LENGTH = 2_000

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

    unless question.present?
      render json: { error: "Question parameter is required" }, status: :bad_request
      return
    end

    if question.length > MAX_QUESTION_LENGTH
      render json: {
        error: "Question is too long. Maximum length is #{MAX_QUESTION_LENGTH} characters."
      }, status: :bad_request
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

  rescue ActiveRecord::RecordInvalid => e
    render json: {
      error: "Unable to save briefing.",
      details: e.record.errors.full_messages
    }, status: :unprocessable_entity
  end
end
