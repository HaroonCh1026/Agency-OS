class CreateClients < ActiveRecord::Migration[8.1]
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :company
      t.string :email
      t.string :phone
      t.string :address
      t.string :city
      t.string :country
      t.string :website
      t.text :notes
      t.string :status, null: false, default: "active"

      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end