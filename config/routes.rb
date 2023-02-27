Rails.application.routes.draw do
    devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_up: 'reg', sign_out: 'logout' }
    devise_scope :user do
      get 'personal', to: 'devise/registrations#edit'
    end

    root :to =>  redirect('/items')

    get '/items/storage', to: 'items#storage'
    resources :items

    resources :users

    get '/personal/orders', to: 'orders#personal_orders'
end
