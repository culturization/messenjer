class EventRelayJob < ApplicationJob
  queue_as :default

  def perform(group_id, op, data)
    ActionCable.server.broadcast(
      "group_#{group_id}",
      {
        op:,
        data:
      }.as_json
    )
  end
end