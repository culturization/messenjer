# frozen_string_literal: true

module NeedsAuth
  extend ActiveSupport::Concern

  included do
    before_action :doorkeeper_authorize!, raise: false
  end

  def current_user
    @current_user ||= User.find(doorkeeper_token[:resource_owner_id])
  end
end