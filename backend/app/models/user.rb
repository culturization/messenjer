# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :avatar
  has_many :owned_groups, foreign_key: :owner_id, class_name: 'Group' # owns many groups
  has_many :members
  has_many :groups, through: :members # particpates in many groups

  validates :name, presence: true, length: { in: 1..30 }, allow_blank: false
  validates :tag, presence: true, format: /\w{1,10}/
  validates :email, presence: true, format: URI::MailTo::EMAIL_REGEXP

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.authenticate(email, password)
    user = User.find_for_authentication(email:)
    user&.valid_password?(password) ? user : nil
  end
end
