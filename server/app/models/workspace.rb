class Workspace < ApplicationRecord
  belongs_to :user
  has_many :clients

  validates :name, presence: true

  validates :name,
            uniqueness: {
              scope: :user_id
            }
end
