class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.string :note_type, null: false

      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end