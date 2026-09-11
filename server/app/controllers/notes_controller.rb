class NotesController < ApplicationController
  before_action :authenticate_user
  before_action :set_workspace
  before_action :set_client

  def index
    @notes = @client.notes
  end

  def create
    note = @client.notes.new(note_params)

    if note.save
      @note = note

      render :create, status: :created
    else
      render json: {
        errors: note.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_workspace
    @workspace = @current_user.workspaces.find_by(id: params[:workspace_id])

    unless @workspace
      render json: { error: "Workspace not found" }, status: :not_found
    end
  end

  def set_client
    @client = @workspace.clients.find_by(id: params[:client_id])

    unless @client
      render json: { error: "Client not found" }, status: :not_found
    end
  end

  def note_params
    params.permit(
      :title,
      :content,
      :note_type,
      files: []
    )
  end
end
