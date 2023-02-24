class ItemsController < ApplicationController
    def index
    end

    def show 
    end

    def edit 
    end
    
    def new 
    end

    def create 
    end

    def update 
    end

    def destroy 
    end

    private

    def post_params 
        params.require(:post).permit(:name, :description, :price)
    end
end
