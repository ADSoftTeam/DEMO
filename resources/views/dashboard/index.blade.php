@extends('layouts.dashboard')
@section('header-css')
	<link rel="stylesheet" href="{{ asset('/css/plugins/morris.js/morris.css') }}">
@endsection
@section('page-title')
Админ-панель
@endsection
@section('main')
<!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
		<div class="col-lg-6 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-blue">
            <div class="inner">
              <h3>{{ $users_count}}</h3>
              <p>Зарегистрированно Пользователей</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="{{ route('dashboard.users') }}" class="small-box-footer">Перейти к списку <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
		
        <div class="col-lg-6 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{ $last->last }}</h3>
              <p>Последняя регистрация</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="{{ route('dashboard') }}" class="small-box-footer">Перейти на главную <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
		
		
      </div>
      <!-- /.row -->
      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <section class="col-lg-12 connectedSortable">
          <!-- Custom tabs (Charts with tabs)-->
          <div class="nav-tabs-custom">
            <!-- Tabs within a box -->
            <ul class="nav nav-tabs pull-right">
              <li class="pull-left header"><i class="fa fa-inbox"></i> Регистрации на сайте (за последние 50 лет)</li>              
            </ul>
            <div class="tab-content no-padding">
              <!-- Morris chart - Sales -->
              <div class="chart tab-pane active" id="revenue-chart" style="position: relative; height: 300px;"></div>             
            </div>
          </div>
          <!-- /.nav-tabs-custom -->
		</section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        
        <!-- right col -->
      </div>
      <!-- /.row (main row) -->

    </section>
    <!-- /.content -->
@endsection

@section('footer-js')
<script src="{{ asset('/js/plugins/raphael/raphael.min.js') }}"></script>
<script src="{{ asset('/js/plugins/morris.js/morris.min.js') }}"></script>
<script>
/* Morris.js Charts */
  // Sales chart
  var area = new Morris.Area({
    element   : 'revenue-chart',
    resize    : true,
    data      : {!! json_encode($registration, JSON_UNESCAPED_UNICODE) !!},
    xkey      : ['day'],
    ykeys     : ['cnt'],
    labels    : ['Регистраций'],
    lineColors: ['#a0d0e0', '#3c8dbc'],
    hideHover : 'auto',
	xLabels : 'year'
  });
  
 </script>
@endsection