Sickstarfish::Application.routes.draw do

  devise_for :users, :path => "",
    :controllers => {
      :omniauth_callbacks => "omniauth_callbacks",
      :registrations => "registrations"
    },
    :path_names => { :sign_in => "login", :sign_out => "logout", :sign_up => "register" }

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
  get "static/contact"

  resources :tweets
end
