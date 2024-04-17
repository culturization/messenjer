# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates_presence_of :user, :group
  validates :content, length: { in: 1..2000 }, presence: true, allow_blank: false
end
