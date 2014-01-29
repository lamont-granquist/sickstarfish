Sickstarfish::Application.routes.draw do

  devise_for :users, :path => "accounts", :controllers => { :omniauth_callbacks => "omniauth_callbacks", :registrations => "registrations" }

  # must come after devise_for
  resources :users do
    member do
      post 'lock'
    end
  end

  root to: 'home#index'

  get "home/index"
  get "static/about"
  get "static/disease"
  get "static/faq"
  get "static/help"

  resources :tweets
end
