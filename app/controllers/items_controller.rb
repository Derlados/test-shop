class ItemsController < ApplicationController
    def index
        @items = Item.all
    end

    def new 
        @item = Item.new 
    end

    def storage
        @items = Item.all
    end

    def show 
        @item = Item.find(params[:id])
    end

    def edit 
        @item = Item.find(params[:id])
    end
    
    def create 
        @item = Item.new(post_params)

        if (@item.save)
            redirect_to items_storage_path
        else
            render :new, status: 400
        end
    end

    def update 
        @item = Item.find(params[:id])

        if (@item.update(post_params))
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

    def post_params 
        params.require(:item).permit(:name, :description, :price)
    end
end
