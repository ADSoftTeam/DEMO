@extends('layouts.app')

@section('content')
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <b>{{ config('app.name') }}</b>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Авторизуйтесь для дальнейшей работы</p>

    <form action="{{ route('login') }}" method="post">
		@csrf
      <div class="form-group has-feedback {{ $errors->has('email') ? 'has-error' : '' }}">
        <input type="text" class="form-control" name="email" placeholder="Логин" value="{{ count(old())
                    ? (old('email') ? old('email') : '')
                    : ((isset($object) && $object->{'email'}) ? $object->{'email'} : '')
            }}">
        <span class="glyphicon glyphicon-email form-control-feedback"></span>		
      </div>
	  @if ($errors->has('email'))
			<div class="alert alert-danger">{{ $errors->first('email') }}</div>
	  @endif
      <div class="form-group has-feedback {{ $errors->has('password') ? 'has-error' : '' }}">
        <input type="password" class="form-control" name="password" placeholder="Пароль">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
	  @if ($errors->has('password'))
		<div class="alert alert-danger">{{ $errors->first('password') }}</div>
	  @endif
      <div class="row">       
        <!-- /.col -->
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Войти</button>
        </div>		
        <!-- /.col -->
      </div>
	  @if(Session::has('message'))
		<div class="alert alert-danger text-center" style="margin-top : 10px;">{{Session::get('message')}}</div>		
		@endif
	  <div class="row">
		<div class="col-md-12">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox" name="remember"> Запомнить меня
            </label>
          </div>
        </div>
	  </div>
    </form>
    
  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->
@endsection

@section('footer-js')
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' /* optional */
    });
  });
</script>
@endsection


