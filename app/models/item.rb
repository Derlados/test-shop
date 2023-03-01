class Item < ApplicationRecord
    validates :name, presence: true, length: {maximum: 100}
    validates :description, presence: true
    validates :price, presence: true, numericality: { greater_than: 0 }

end
