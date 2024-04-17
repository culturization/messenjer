# frozen_string_literal: true

module Api
  class MessagesController < ActionController::API
    include NeedsAuth

    def create
      group = Group.find(params[:group_id])

      return render(json: { error: 'Invalid group' }, status: 404) unless group

      unless (current_user.groups | current_user.owned_groups).include?(group)
        return render(json: { error: "You can't send message to a group you are not in" }, status: 403)
      end

      message = Message.new(user: current_user, group: group, content: params[:content])

      return render(json: { error: message.errors.full_messages }, status: 400) unless message.save

      EventRelayJob.perform_later(group.id, 0, message)
      render(json: message)
    end

    def showall
      # Check if the current user is a member of this group
      # Check if the message is valid
      unless current_user.groups.find_by(params[:group_id]) &&
        Message.find_by(id: params[:id], group_id: params[:group_id])

        return render(json: { error: 'Invalid message or group ID' }, status: 404)
      end

      messages = Message.where(id: 0..params[:id].to_i, group: params[:group_id])
        .select(:id, :user_id, :content, :created_at, :updated_at)
        .order(:created_at)
        .take(100)

      render(json: messages)
    end

    def showlatest
      # Check if the current user is a member of this group
      unless current_user.groups.find_by(params[:group_id])
        return render(json: { error: 'Invalid group ID' }, status: 404)
      end

      messages = Message.where(group: params[:group_id])
        .select(:id, :user_id, :content, :created_at, :updated_at)
        .order(:created_at)
        .take(100)

      render(json: messages)
    end
  end
end
