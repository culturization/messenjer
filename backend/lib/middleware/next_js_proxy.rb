require 'rack/proxy'

class NextJsProxy < Rack::Proxy
  def initialize(app)
    super()
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)

    if request.path.start_with?('/api')
      @app.call(env)
    else
      env['HTTP_HOST'] = 'localhost:3035'
      perform_request(env)
    end
  end
end