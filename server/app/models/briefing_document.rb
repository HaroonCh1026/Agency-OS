class BriefingDocument < ApplicationRecord
  belongs_to :client

  validates :question, presence: true
  validates :content, presence: true
end
