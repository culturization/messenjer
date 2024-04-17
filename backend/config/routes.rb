# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users

  namespace :api do
    post 'register', to: 'users#register'
    post 'login', to: 'users#login'
    
    get 'users/me', to: 'users#showme'

    resources :users, only: %i[show]

    resources :groups, only: %i[show create]

    get 'groups', to: 'groups#showall'

    put 'groups/:id/join', to: 'groups#join'

    scope 'groups/:group_id' do
      get 'messages', to: 'messages#showall'
      get 'messages/latest', to: 'messages#showlatest'
      resources :messages, only: %i[create]
    end
  end

  use_doorkeeper do
    skip_controllers :authorizations, :applications, :authorized_applications
  end
end
