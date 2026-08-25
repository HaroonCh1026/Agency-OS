class User < ApplicationRecord
  has_secure_password

  has_many :workspaces, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true
  validates :password, presence: true, length: { minimum: 6 }
end