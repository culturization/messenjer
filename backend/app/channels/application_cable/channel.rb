module ApplicationCable
  class GatewayChannel < ActionCable::Channel::Base
    def subscribed
      reject unless current_user

      Group.where(user: current_user).find_each do |group|
        stream_from "group_#{group.id}"
      end
    end
  
    def unsubscribed
      stop_all_streams
    end
  end
end
