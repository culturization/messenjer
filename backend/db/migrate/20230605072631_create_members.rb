class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.belongs_to :user
      t.belongs_to :group
      t.integer :permissions, default: 0

      t.timestamps
    end
  end
end
