Sickstarfish::Application.routes.draw do
  root to: 'home#index'

  get "home/index"
  get "static/about"
  get "static/disease"
  get "static/faq"

  resources :tweets

end
