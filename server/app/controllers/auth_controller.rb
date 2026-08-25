class AuthController < ApplicationController
  before_action :authenticate_user, only: [:profile]

  def signup
    user = User.new(user_params)

    if user.save
      render json: {
        message: "User created successfully"
      }, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:login]) ||
           User.find_by(username: params[:login])

    if user&.authenticate(params[:password])
      token = generate_token(user)

      render json: {
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone
        }
      }
    else
      render json: {
        error: "Invalid username/email or password"
      }, status: :unauthorized
    end
  end

  def profile
    render json: {
      id: @current_user.id,
      username: @current_user.username,
      email: @current_user.email,
      phone: @current_user.phone
    }
  end

  private

  def user_params
    params.permit(
      :username,
      :email,
      :phone,
      :password,
      :password_confirmation
    )
  end
end