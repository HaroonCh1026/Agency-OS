class Client < ApplicationRecord
  belongs_to :workspace

  validates :name, presence: true

  validates :email,
            format: { with: URI::MailTo::EMAIL_REGEXP },
            allow_blank: true

  validates :status,
            inclusion: { in: ["active", "inactive"] }
end