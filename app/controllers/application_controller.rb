class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    before_action :configure_permitted_parameters, if: :devise_controller?

    protected
  
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
        devise_parameter_sanitizer.permit(:account_update , keys: [:first_name, :last_name])
    end

    def is_admin
        if (!current_user.admin?)
            render :file => "public/404.html", :status => :unauthorized
        end
    end

end
