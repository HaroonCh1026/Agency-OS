json.message "Note created successfully"

json.note do
  json.partial! "notes/note", note: @note
end
