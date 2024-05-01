# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

require './lib/middleware/next_js_proxy'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mesenjer
  class Application < Rails::Application
    config.api_only = true

    config.action_cable.disable_request_forgery_protection = true

    config.action_cable.mount_path = '/cable'

    config.force_ssl = true

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.middleware.insert_before 0, NextJsProxy
  end
end
