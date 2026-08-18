class NotesChannel < ApplicationCable::Channel
  def subscribed
    workspace = current_user.workspaces.find_by(id: params[:workspace_id])

    reject unless workspace

    client = workspace.clients.find_by(id: params[:client_id])

    reject unless client

    stream_for client
  end

  def unsubscribed
    stop_all_streams
  end
end