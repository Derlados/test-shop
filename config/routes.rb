Rails.application.routes.draw do
    root :to =>  redirect('/items')

    resources :items
end
