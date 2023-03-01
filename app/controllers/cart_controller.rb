class CartController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :validate_new_item, only: [:add] 

    def add 
        @id = params[:id].to_i
        @quantity = params[:quantity].to_i
        helpers.cart_new_item(@id, @quantity)

        render json: { test: helpers.cart_has_item(params[:id].to_i), newAmount: helpers.get_amount_of_items,  totalItem: helpers.calculate_one(@id),  total: helpers.calculate_total },  status: 200
    end

    def edit 
        @id = params[:id].to_i
        @quantity = params[:quantity].to_i
        helpers.cart_edit_item(@id, @quantity)

        render json: { newAmount: helpers.get_amount_of_items,  totalItem: helpers.calculate_one(@id),  total: helpers.calculate_total },  status: 200
    end

    def delete 
        @id = params[:id].to_i
        helpers.delete_cart_item(@id)

        render json: { newAmount: helpers.get_amount_of_items,  total: helpers.calculate_total },  status: 200
    end

    private

    def validate_new_item
        
        if (helpers.cart_has_item(params[:id].to_i))
            render json: {message: "in cart already"}, status: 400
        end
    end
end
