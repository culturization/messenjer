# frozen_string_literal: true

Doorkeeper.configure do
  orm :active_record

  resource_owner_from_credentials do |_routes|
    User.authenticate(params[:email], params[:password])
  end

  grant_flows %w[password]

  allow_blank_redirect_uri true

  skip_authorization { true }
end
