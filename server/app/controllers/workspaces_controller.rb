class WorkspacesController < ApplicationController
  before_action :authenticate_user
  before_action :set_workspace, only: [:show, :update, :destroy]

  def index
    workspaces = @current_user.workspaces

    render json: workspaces, status: :ok
  end

  def show
    render json: @workspace, status: :ok
  end

  def create
    workspace = @current_user.workspaces.new(workspace_params)

    if workspace.save
      render json: {
        message: "Workspace created successfully",
        workspace: workspace
      }, status: :created
    else
      render json: {
        errors: workspace.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @workspace.update(workspace_params)
      render json: {
        message: "Workspace updated successfully",
        workspace: @workspace
      }, status: :ok
    else
      render json: {
        errors: @workspace.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @workspace.destroy

    render json: {
      message: "Workspace deleted successfully"
    }, status: :ok
  end

  private

  def set_workspace
    @workspace = @current_user.workspaces.find_by(id: params[:id])

    unless @workspace
      render json: { error: "Workspace not found" }, status: :not_found
    end
  end

  def workspace_params
    params.permit(:name)
  end
end