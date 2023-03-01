class OrdersController < ApplicationController
    before_action :is_not_empty_cart, only: [:checkout]

    def checkout
        @cart_items = helpers.get_cart
        @total_price = helpers.calculate_total
        @order_items = []

        @items = Item.find(helpers.get_cart_item_ids)

        @cart_items.each do |cart_item|
            @order_items.push({
                item: @items.detect {|i| i.id == cart_item[0]},
                quantity: cart_item[1]
            })  
        end

        if flash[:success] 
            helpers.clear_cart
        end
    end
    
    def personal_orders
        @orders = Order.where("user_id = ?", current_user.id).order(created_at: :asc)
    end

    def create 
        @orders_description = get_description_from_cart;

        @user = User.find(current_user.id)
        @order =  @user.orders.create({amount: helpers.calculate_total})
        @order.orders_description.create(get_description_from_cart)

        flash[:success] = "Created"
        redirect_to checkout_path
    end

    private

    def get_description_from_cart 
        @order_items = []
        @cart_items = helpers.get_cart
        @cart_items.each do |cart_item|
            @order_items.push({item_id: cart_item[0], quantity: cart_item[1]})
        end

        return @order_items
    end

    def is_not_empty_cart
        @cart_items = helpers.get_cart
        if @cart_items.length() == 0
            redirect_back fallback_location: "/"
        end
    end

end
