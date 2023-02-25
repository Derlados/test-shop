class ItemsController < ApplicationController
    def index
        @items = Item.all
    end

    def show 
        @item = Item.find(params[:id])
    end

    def edit 
        @item = Item.find(params[:id])
    end
    
    def new 
        @item = Item.new 
    end

    def create 
        @item = Item.new(post_params)

        if @item.save
            redirect_to @item
        else
            rander :new, status: 400
        end
    end

    def update 
        @item = Item.new(params[:id])

        if @item.update(post_params)
            redirect_to @item
        else
            rander :new, status: 400
        end
    end

    def destroy 
        @item = Item.find(params[:id])
        @item.destroy 
        
        redirect_to items_path
    end

    private

    def post_params 
        params.require(:post).permit(:name, :description, :price)
    end
end
