class ApplicationController < ActionController::API

  private

  def generate_token(user)
    payload = {
      user_id: user.id,
      exp: 24.hours.from_now.to_i
    }

    JWT.encode(payload, ENV["JWT_SECRET"], "HS256")
  end

  def decoded_token
    auth_header = request.headers["Authorization"].to_s
    scheme, token = auth_header.split(" ", 2)

    return nil unless scheme == "Bearer" && token.present?

    begin
      JWT.decode(
        token,
        ENV["JWT_SECRET"],
        true,
        algorithm: "HS256"
      )
    rescue JWT::DecodeError, JWT::ExpiredSignature
      nil
    end
  end

  def current_user
    return nil unless decoded_token

    user_id = decoded_token[0]["user_id"]
    User.find_by(id: user_id)
  end

  def authenticate_user
    @current_user = current_user

    unless @current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

end