# frozen_string_literal: true

class Group < ApplicationRecord
  has_one_attached :avatar
  has_many :members
  has_many :users, through: :members
  belongs_to :user, foreign_key: :owner_id # owner

  validates_presence_of :owner_id
  validates :name, length: { in: 1..20 }, presence: true, allow_blank: false
end
