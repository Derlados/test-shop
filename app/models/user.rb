class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
    enum role: [:user, :admin]

    after_initialize :set_default_role, :if => :new_record?
    def set_default_role 
        self.role ||= :user
    end

    validates :first_name, presence: true
    validates :last_name, presence: true

    has_many :orders, dependent: :delete_all 
end
