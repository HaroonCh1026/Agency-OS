class Client < ApplicationRecord
  belongs_to :workspace
  has_many :notes, dependent: :destroy
  has_many :briefing_documents, dependent: :destroy

  validates :name, presence: true

  validates :email,
            format: { with: URI::MailTo::EMAIL_REGEXP },
            allow_blank: true

  validates :status,
            inclusion: { in: [ "active", "inactive" ] }
end
