class UsersController < ApplicationController
    before_action :is_admin

    def index
        @search = params.has_key?(:search) ? params[:search].downcase : ''; 
        @search = @search.delete(' ');
        @users = User.where("lower(concat(first_name, last_name)) LIKE ? ", "%#{@search}%")
            .order(id: :asc)
    end

    def edit 
    end
end
