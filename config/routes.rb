Rails.application.routes.draw do
    root :to =>  redirect('/items')

    get '/items/storage', to: 'items#storage'
    resources :items
end
