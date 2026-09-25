class Note < ApplicationRecord
  belongs_to :client
  has_many_attached :files

  after_create :broadcast_created

  validates :title, presence: true

  validates :content, presence: true

  validates :note_type,
            inclusion: {
              in: %w[meeting call email task general]
            }

  private

  def broadcast_created
    NotesChannel.broadcast_to(
      client,
      {
        type: "note_created",
        note: {
          id: id,
          client_id: client_id,
          title: title,
          content: content,
          note_type: note_type,
          files: files.map do |file|
            {
              id: file.id,
              filename: file.filename.to_s,
              content_type: file.content_type,
              byte_size: file.byte_size
            }
          end
        }
      }
    )
  end
end
