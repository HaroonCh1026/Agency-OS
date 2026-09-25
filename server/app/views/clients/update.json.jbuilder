json.message "Client updated successfully"

json.client do
  json.partial! "clients/client", client: @client
end
