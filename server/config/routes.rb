Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  post "/signup", to: "auth#signup"
  post "/login", to: "auth#login"
  get "/profile", to: "auth#profile"

  resources :workspaces do
    resources :clients do
      resources :notes, only: [:index, :create]

      post "/ai", to: "ai#create"
    end
  end
end