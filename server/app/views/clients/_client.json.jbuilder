json.id client.id
json.workspace_id client.workspace_id
json.name client.name
json.company client.company
json.email client.email
json.phone client.phone
json.address client.address
json.city client.city
json.country client.country
json.website client.website

json.notes client.notes do |note|
  json.id note.id
  json.title note.title
  json.content note.content
  json.note_type note.note_type
  json.client_id note.client_id
  json.created_at note.created_at
  json.updated_at note.updated_at
end

json.status client.status
