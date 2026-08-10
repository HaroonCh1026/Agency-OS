class ClientsController < ApplicationController
  before_action :authenticate_user
  before_action :set_workspace
  before_action :set_client, only: [:show, :update, :destroy]

  def index
    clients = @workspace.clients

    render json: clients, status: :ok
  end

  def show
    render json: @client, status: :ok
  end

  def create
    client = @workspace.clients.new(client_params)

    if client.save
      render json: {
        message: "Client created successfully",
        client: client
      }, status: :created
    else
      render json: {
        errors: client.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @client.update(client_params)
      render json: {
        message: "Client updated successfully",
        client: @client
      }, status: :ok
    else
      render json: {
        errors: @client.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @client.destroy

    render json: {
      message: "Client deleted successfully"
    }, status: :ok
  end

  private

  def set_workspace
    @workspace = @current_user.workspaces.find_by(id: params[:workspace_id])

    unless @workspace
      render json: { error: "Workspace not found" }, status: :not_found
    end
  end

  def set_client
    @client = @workspace.clients.find_by(id: params[:id])

    unless @client
      render json: { error: "Client not found" }, status: :not_found
    end
  end

  def client_params
    params.permit(
      :name,
      :company,
      :email,
      :phone,
      :address,
      :city,
      :country,
      :website,
      :notes,
      :status
    )
  end
end