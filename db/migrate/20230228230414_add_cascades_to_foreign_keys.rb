class AddCascadesToForeignKeys < ActiveRecord::Migration[7.0]
    def change
        remove_foreign_key :orders, :users
        remove_foreign_key :orders_descriptions, :orders
        add_foreign_key :orders, :users, on_delete: :cascade, on_update: :cascade
        add_foreign_key :orders_descriptions, :orders, on_delete: :cascade, on_update: :cascade
    end
end
