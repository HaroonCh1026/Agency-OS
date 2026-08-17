Rails.application.routes.draw do
  post "/signup", to: "auth#signup"
  post "/login", to: "auth#login"

  get "/profile", to: "auth#profile" 

resources :workspaces do
  resources :clients do
    resources :notes, only: [:index, :create]
  end
end
end