module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      user = User.find_by(id: decoded_token["user_id"])

      return user if user

      reject_unauthorized_connection
    end

    def decoded_token
      token = request.params[:token]

      return {} unless token

      JWT.decode(
        token,
        ENV["JWT_SECRET"],
        true,
        algorithm: "HS256"
      )[0]
    rescue JWT::DecodeError, JWT::ExpiredSignature
      {}
    end
  end
end