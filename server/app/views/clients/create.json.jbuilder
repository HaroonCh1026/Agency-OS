json.message "Client created successfully"

json.client do
  json.partial! "clients/client", client: @client
end
