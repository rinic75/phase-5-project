Rails.application.routes.draw do
  
  resources :messages
  resources :categories, only: [:index, :show]
  resources :lists
  resources :users

  get '/auth', to: 'users#auth'
  post '/signup', to: 'users#signup'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'

  get '/users/:user_id/receivedMessages', to: 'users#received_messages'
  get '/users/:user_id/sentMessages', to: 'users#sent_messages'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
