# frozen_string_literal: true

module NeedsAuth
  extend ActiveSupport::Concern

  def current_user
    return @current_user if @current_user

    return unless doorkeeper_token && (user = User.find(doorkeeper_token[:resource_owner_id]))

    @current_user ||= user
  end

  def invalid_token
    render(json: { error: 'Invalid token' }, status: 403)
  end

  included do
    before_action :doorkeeper_authorize!, raise: false
  end
end