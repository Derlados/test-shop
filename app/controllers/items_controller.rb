class ItemsController < ApplicationController
    before_action :is_admin, except: [:index, :show]

    def index
        @search = params[:search];

        @transformed_search = params.has_key?(:search) ? @search.downcase : ''; 
        @transformed_search = @transformed_search.delete(' ');
        @items = Item.where("REPLACE(lower(name), '\s', '') LIKE ? ", "%#{@transformed_search}%")
    
        @cart_items_ids = helpers.get_cart_item_ids;
    end

    def new 
        @item = Item.new 
    end

    def storage
        @search = params[:search];

        @transformed_search = params.has_key?(:search) ? @search.downcase : ''; 
        @transformed_search = @transformed_search.delete(' ');
        @items = Item.where("lower(name) LIKE ? ", "%#{@transformed_search}%")
    end

    def show 
        @item = Item.find(params[:id])

        @cart_items_ids = helpers.get_cart_item_ids;
        @in_cart = @cart_items_ids.include?(params[:id].to_i)
    end

    def edit 
        @item = Item.find(params[:id])
    end
    
    def create 
        @item = Item.new(item_params)

        if (@item.save)
            redirect_to items_storage_path
        else
            render :new, status: 400
        end
    end

    def update 
        @item = Item.find(params[:id])

        if (@item.update(item_params))
            redirect_to items_storage_path
        else
            render :edit, status: 400
        end
    end

    def destroy 
        @item = Item.find(params[:id])
        @item.destroy 
        
        redirect_to items_storage_path
    end

    private

    def item_params 
        params.require(:item).permit(:name, :description, :price)
    end


end
