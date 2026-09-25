json.array! @notes do |note|
  json.partial! "notes/note", note: note
end
