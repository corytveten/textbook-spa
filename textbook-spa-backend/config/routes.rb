Rails.application.routes.draw do
  resources :textbooks
  resources :courses
  resources :schools
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
