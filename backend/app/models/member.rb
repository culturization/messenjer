class Member < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :permissions, :numericality => { only_integer: true }
end
