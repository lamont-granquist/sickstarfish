class Ability
  include CanCan::Ability

  def initialize(user)
    case
    when user.nil?
      can :read, Tweet
    when user.role?(:admin)
      can :manage, Tweet
      can [ :read, :create, :update, :admin ], User
      can [ :lock, :destroy ], User do |target_user|
        target_user != user
      end
    else
      can :read, Tweet
      can :create, Tweet
      can [ :update, :destroy ], Tweet do |tweet|
        tweet.try(:user) == user
      end
      can :show, User
    end
  end
end
