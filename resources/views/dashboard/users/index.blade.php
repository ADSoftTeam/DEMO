@extends('layouts.dashboard')

@section('header-css')
	<link rel="stylesheet" href="{{ asset('/css/plugins/bootstrap-table/bootstrap-table.min.css') }}">
	<link rel="stylesheet" href="{{ asset('/css/plugins/iCheck/all.css') }}">		
@endsection

@section('page-title')
Пользователи
@endsection

@section('nav-layout')
<li class="active"><b>Пользователи</b></li>
@endsection

@section('main')

@if (!empty(session('message'))) <div class="alert alert-success"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> {{ session('message') }} </div> @endif 

<!-- основные поля -->
<div class="box box-primary">
	<div class="box-header with-border">
		<h3 class="box-title">Список пользователей</h3>
	</div>
	<!-- /.box-header -->
		
	<div class="panel panel-default">
		<div class="panel-body">			
			<div class="box-body">				
				<div class="row" style="padding-bottom: 10px;">
					<div class="col-md-12">
						<button class="btn btn-success js-add-user">Добавить пользователя</button>
					</div>
				</div>
				
				<table id="table"
							data-url="/dashboard/users"
							data-row-style="rowStyle"
							data-striped="true"
							data-toggle="table" 
							data-locale="ru-RU"								
							data-side-pagination="server"
							data-pagination="true"
							data-search="false"
							data-sort-name="created_at"
							data-sort-order="desc"
							data-page-list="[15, 30, 50, 100, 200]"
							>
						<thead>
							<tr>							
								<th data-field="created_at" data-sortable="true">Зарегистрирован</th>
								<th data-field="name" data-sortable="true">Пользователь</th>							
								<th data-field="email" data-sortable="true">E-mail</th>							
								<th data-formatter="actionFormatter" data-events="actionEvents" data-class='actions-row'>Действия</th>
							</tr>
						</thead>
					</table>
				
			</div>
		</div>
	</div>
</div>
<!-- /.box -->

	<div class="modal modal-default fade" id="modal-default">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Добавление пользователя</h4>
              </div>
			  <form class="form-horizontal" method="POST" name="form-users" id="form-users" role="form" >										
				<div class="modal-body">                
					<div class="form-group row">
						<label class="col-sm-4 control-label" for="name">Имя:</label>
						<div class="col-sm-8">
							<input type="text" id="name" name="name" class="form-control" value="">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-4 control-label" for="email">E-mail:</label>
						<div class="col-sm-8">
							<input type="text" id="email" name="email" class="form-control" value="">
						</div>
					</div>
					
					<div class="form-group row">
						<label class="col-sm-4 control-label" for="password">Пароль:</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="password" id="password" name="password" class="form-control" value="">
								<span class="input-group-btn">
									<button class="btn btn-success js-generate" type="button">Создать</button>
								</span>								
							</div>
						</div>
					</div>								
					
					<div class="form-group row">
						<label class="col-sm-4 control-label" for="password_confirmation">Подтверждение пароля:</label>
						<div class="col-sm-8">
							<input type="password" id="password_confirmation" name="password_confirmation" class="form-control" value="">
						</div>
					</div>			
				</div>
              <div class="modal-footer">               
				<button type="button" class="btn btn-warning pull-left" data-dismiss="modal">Отмена</button>
                <button type="submit" class="btn btn-success js-add">Сохранить</button>                            
              </div>
			  </form>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

@endsection

@section('footer-js')
<script src="{{ asset('/js/plugins/bootstrap-table/bootstrap-table.min.js') }}"></script>
<script src="{{ asset('/js/plugins/bootstrap-table/locale/bootstrap-table-ru-RU.min.js') }}"></script>

<script src="{{ asset('/js/app/confirm.js') }}"></script>
<script src="{{ asset('/js/app/users_list.js') }}"></script>

@endsection