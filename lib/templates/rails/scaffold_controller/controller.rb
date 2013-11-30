class <%= controller_class_name %>Controller < ApplicationController
  respond_to :html, :json

  def index
    @<%= plural_table_name %> = <%= class_name %>.paginate(:page => params[:page], :per_page => 25)
    respond_with(@<%= plural_table_name %>)
  end

  def show
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    respond_with(@<%= singular_table_name %>)
  end

  def new
    @<%= singular_table_name %> = <%= class_name %>.new
    respond_with(@<%= singular_table_name %>)
  end

  def edit
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    respond_with(@<%= singular_table_name %>)
  end

  def create
    @<%= singular_table_name %> = <%= class_name %>.new(params[:<%= singular_table_name %>])
    if @<%= orm_instance.save %>
      flash[:notice] = '<%= human_name %> was successfully created.'
    else
      flash[:error] = 'There was a problem saving the <%= human_name %>.'
    end
    respond_with(@<%= singular_table_name %>)
  end

  def update
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    if @<%= orm_instance.update_attributes("params[:#{singular_table_name}]") %>
      flash[:notice] = '<%= human_name %> was successfully updated.'
    else
      flash[:error] = 'There was a problem updating the <%= human_name %>.'
    end
    respond_with(@<%= singular_table_name %>)
  end

  def destroy
    @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    @<%= orm_instance.destroy %>
    flash[:notice] = 'Successfully destroyed <%= human_name %>.'
    respond_with(@<%= singular_table_name %>)
  end

end
