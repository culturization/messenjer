# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = authorize

      current_user.groups.each do |group|
        EventRelayJob.perform(group.id, 1, {
          id: current_user.id,
          status: "online" 
        })
      end
    end

    def authorize
      token = Doorkeeper::AccessToken.find_by_token(request.params[:token])

      # TODO: check if token has expired

      User.find(token[:resource_owner_id]) || reject_unauthorized_connection
    end
  end
end
