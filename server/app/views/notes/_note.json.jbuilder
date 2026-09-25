json.id note.id
json.client_id note.client_id
json.title note.title
json.content note.content
json.note_type note.note_type

json.files note.files do |file|
  json.id file.id
  json.filename file.filename.to_s
  json.content_type file.content_type
  json.byte_size file.byte_size
end