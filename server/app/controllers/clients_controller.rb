class ClientsController < ApplicationController
  before_action :authenticate_user
  before_action :set_workspace
  before_action :set_client, only: [:show, :update, :destroy ]

  def index
    @clients = @workspace.clients
  end

  def show
  end

  def create
    client = @workspace.clients.new(client_params)

    if client.save
      @client = client

      render :create, status: :created
    else
      render json: {
        errors: client.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    if @client.update(client_params)
      render :update, status: :ok
    else
      render json: {
        errors: @client.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
  @client.destroy

  render :destroy, status: :ok
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
      :status
    )
  end
end
