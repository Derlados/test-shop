class OrdersController < ApplicationController

    def new 
    end
    
    def personal_orders
        @orders = Order.all
    end


end
