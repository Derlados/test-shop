class CartController < ApplicationController
    skip_before_action :verify_authenticity_token

    def add 
        @id = params[:id].to_i
        @quantity = params[:quantity].to_i

        @cart_items = helpers.get_cart
        @cart_items.push([@id, @quantity])

        cookies[:CART] = JSON.generate(@cart_items)

        render json: { newAmount: helpers.get_amount_of_items,  totalItem: helpers.calculate_one(@id),  total: helpers.calculate_total },  status: 200
    end

    def edit 
        @id = params[:id].to_i
        @quantity = params[:quantity].to_i

        @cart_items = helpers.get_cart
        @cart_items = @cart_items.map { |ci| ci[0] == @id ?  [@id, @quantity] : ci }

        cookies[:CART] = JSON.generate(@cart_items)

        render json: { newAmount: helpers.get_amount_of_items,  totalItem: helpers.calculate_one(@id),  total: helpers.calculate_total },  status: 200
    end

    def delete 
        @id = params[:id].to_i

        @cart_items = helpers.get_cart
        @cart_items.delete_if {|item| item[0] == @id } 

        cookies[:CART] = JSON.generate(@cart_items)

        render json: { newAmount: helpers.get_amount_of_items,  total: helpers.calculate_total },  status: 200
    end


end
