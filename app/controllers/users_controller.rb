class UsersController < ApplicationController
    SUPER_ADMIN_ID = 1
    before_action :is_admin

    def index
        @search = params[:search];

        @transformed_search = params.has_key?(:search) ? @search.downcase : ''; 
        @transformed_search = @transformed_search.delete(' ');
        @users = User.where("lower(concat(first_name, last_name)) LIKE ? ", "%#{@transformed_search}%")
            .where("id != ?", UsersController::SUPER_ADMIN_ID)
            .order(id: :asc)
        
    end

    def edit 
        @user = User.find(params[:id])
    end

    def update 
        @user = User.find(params[:id])

        if (@user.update(user_params))
            redirect_to users_path
        else
            render :edit, status: 400
        end
    end

    def destroy 
        @item = User.find(params[:id])
        @item.destroy 
        
        redirect_to users_path
    end

    private 

    def user_params 
        @new_user = params.require(:user).permit(:first_name, :last_name, :role)
        @new_user[:role] = @new_user[:role].to_i #f.select send role as StringInteger, not Integer

        return @new_user
    end
end
