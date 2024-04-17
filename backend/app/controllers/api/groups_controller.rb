# frozen_string_literal: true

module Api
  class GroupsController < ActionController::API
    include NeedsAuth

    def show
      group = Group.find(params[:id])

      group ? render(json: group) : render(json: { error: group.errors.full_messages }, status: 404)
    end

    def create
      group = Group.new(name: params[:name], owner_id: current_user.id)

      return render(json: { error: group.errors.full_messages }, status: 400) unless group.save

      unless Member.new(user: current_user, group: group).save
        # Something went really wrong

        return render(json: { error: group.errors.full_messages }, status: 400)
      end

      render(json: group)
    end

    def join
      group = Group.find(params[:id])

      return render(json: { error: 'No such group' }, status: 404) unless group

      return render(json: { error: "You can't join group you're already in"} ) if current_user.groups.include?(group)

      member = Member.new(user: current_user, group:)
      member.save!
    end

    def showall
      render(json: current_user.groups)
    end
  end
end
