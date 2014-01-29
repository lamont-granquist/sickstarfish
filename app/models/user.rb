class User < ActiveRecord::Base
  has_and_belongs_to_many :roles
  has_many :authorizations, :dependent => :destroy

  validates_presence_of :name

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  devise :omniauth_providers => [:facebook, :twitter, :instagram]

  devise :case_insensitive_keys => [ :email ]

  #
  # CANCAN SECTION
  #

  # roles are stored CamelCase, but can be accessed through lowercase, underscored symbols
  def role?(role)
    return !!roles.find_by_name(role.to_s.camelize)
  end

  def set_roles(roles)
    roles = roles.map{|r| Role.find_by_name(r.to_s.camelize)}
  end

  def add_role(role)
    role_name = role.to_s.camelize
    roles << Role.find_by_name(role_name) unless role?(role_name)
  end

  def remove_role(role)
    role_name = role.to_s.camelize
    roles - [ Role.find_by_name(role_name) ]
  end

  def lock
    add_role(:locked)
  end

  def unlock
    remove_role(:locked)
  end

end
