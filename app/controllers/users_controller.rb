class UsersController < ApplicationController
  load_and_authorize_resource
  respond_to :html, :json
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.paginate(:page => params[:page], :per_page => 25)
    respond_with(@users)
  end

  def show
    respond_with(@user)
  end

  def new
    @user = User.new
    respond_with(@user)
  end

  def edit
    respond_with(@user)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'User was successfully created.'
    else
      flash[:error] = 'There was a problem saving the User.'
    end
    respond_with(@user)
  end

  def update
    if @user.update(user_params)
      flash[:notice] = 'User was successfully updated.'
    else
      flash[:error] = 'There was a problem updating the User.'
    end
    respond_with(@user)
  end

  def destroy
    @user.destroy
    flash[:notice] = 'Successfully destroyed User.'
    respond_with(@user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:login, :email, :name, :password, :password_confirmation, :remember_me)
  end
end

