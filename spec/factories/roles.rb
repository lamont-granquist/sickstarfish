FactoryGirl.define do
  factory :admin_role, class: Role do
    name "Admin"
  end

  factory :user_role, class: Role do
    name "User"
  end

  factory :locked_role, class: Role do
    name "Locked"
  end
end

