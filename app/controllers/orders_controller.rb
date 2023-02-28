class OrdersController < ApplicationController

    def new 
        @total_price = helpers.calculate_total
        @order_items = []
        @cart_items = helpers.get_cart
        @items = Item.find(helpers.get_cart_item_ids)

        @cart_items.each do |cart_item|
            @order_items.push({
                item: @items.detect {|i| i.id == cart_item[0]},
                quantity: cart_item[1]
            })  
        end
    end
    
    def personal_orders
        @orders = Order.all
    end




end
