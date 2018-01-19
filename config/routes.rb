Rails.application.routes.draw do
  # for user facing side of CP
  get '/app', to: "app#index"

end
