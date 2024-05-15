# frozen_string_literal: true

module Api
  class UsersController < ActionController::API
    include NeedsAuth

    skip_before_action :doorkeeper_authorize!, only: %i[register login], raise: false

    def register
      user = User.new(user_params)

      if user.save
        render(json: {
          user: {
            name: user.name,
            email: user.email,
            tag: user.tag,
            created_at: user.created_at.to_time.to_i
          }
        })
      else
        render(json: { error: user.errors.full_messages }, status: 400)
      end
    end

    def login
      user = User.find_by_email(user_params[:email])

      return render(json: { error: 'Invalid email' }, status: 400) unless user
      
      return render(json: { error: 'Invalid password' }, status: 400) unless user.valid_password?(params[:password])

      access_token = Doorkeeper::AccessToken.create(resource_owner_id: user.id, scopes: '')

      return render(json: {
        access_token: access_token.token,
        token_type: 'Bearer'
      })
    end

    def show
      user = User.find(user_params[:id])

      return render(json: { error: 'Invalid ID' }, status: 400) unless user

      render(json: {
        id: user.id,
        name: user.name,
        tag: user.tag,
        created_at: user.created_at.to_time.to_i,
      })
    end

    def showme
      user = current_user

      render(json: {
        id: user.id,
        name: user.name,
        tag: user.tag,
        created_at: user.created_at.to_time.to_i,
      })
    end

    private

    def user_params
      params.permit(:id, :name, :email, :tag, :password, :avatar)
    end
  end
end