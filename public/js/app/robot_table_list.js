function TextFormatter(value, row) {	    
	return (!value) ? '-' : (value.length>150 ? value.substr(0,150) + '...' : value);
}

function imageFormatter(value) {
	var out = (!value) 
				? '<img src="/storage/no_foto.jpg" />' 
				: '<a href="/storage/'+ value + '" data-toggle="lightbox"><img src="/storage/'+ value + '" height="50px"></a>';	
	return out;
}

function roleFormatter(value,row) {
	var out = '';
	value.forEach(function(item) {
		if (item.language == row.language) out = item.title
	});
	return out;
}


function actionFormatter(value, row, index) {

    return [        
		'<a href="/dashboard/mech/'+ row.id +'/copy" title="Создать копию">',
        '<button type="button" class="btn btn-info btn-sm"><i class="glyphicon glyphicon-paste"></i></button>',
        '</a>',
		'&nbsp;&nbsp;',
		'<a href="/dashboard/mech/'+ row.id +'" title="Редактировать">',
        '<button type="button" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-edit"></i></button>',
        '</a>',
		'&nbsp;&nbsp;',
        '<a class="js-item-delete" href="#" title="Удалить">',
        '<button type="button" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-remove"></i></button>',
        '</a>'
    ].join('');
}

var actionEvents = {'click .js-item-delete': function (e, value, row, index) {
	e.preventDefault();
	confirm_delete('Удалить элемент?','js-item-delete-confirm',row.id);
}};


$(function () {		
	$table = $('#table');
    $table.bootstrapTable({locale:'ru-RU'});	

	$('body').on('click','.js-item-delete-confirm',function(e) {
		e.preventDefault();
		var id = $(this).data('param');		
		// посылаем запрос на бэк, если успешно удалилось - очищаем в таблице
		// delete
		var csrf = $("meta[name=csrf-token]").attr("content");
		$.ajax({
			url		: "/dashboard/mech/"+id,
			data 	: {'_token' : csrf },
			type	: "DELETE",
			success: function (data) {				
				$table.bootstrapTable('refresh');
				$("#modal-info  .modal-title").text('Сообщение');
				$("#modal-info  .modal-body p").text(data.payload);
				$("#modal-info").modal('show');
			},
			error	: function(item) {
				var error = item.responseJSON.errors.name[0];
				$("#modal-danger  .modal-title").text('Ошибка удаления');
				$("#modal-danger  .modal-body p").text(error);
				$("#modal-danger").modal('show');
			}
		});
		
		$('#modal-warning').modal('hide');
	});
	
	
	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox({
                alwaysShowClose: true				
		});
	});
	
	$("body").on("click",".js-add-item", function(e){		
		e.preventDefault();
		var mech = $(this).data('mech');		
		var edit = $(this).data('id');
		var mech_id = $(this).data('mech-id');
		
		$.ajax({
			url		: "/dashboard/mech/line/create",
			data 	: {'mech_id' : mech_id, 'id' : edit },
			type	: "GET",
			success: function (data) {				
				$("#modal-default  .modal-title").text(edit ? 'Редактирование строки характеристи меха ('+mech+')' : 'Добавление новой строки характеристик меха ('+mech+')');
				$("#modal-default  .modal-body p").html(data.payload);
				$("#modal-default").modal('show');
			},
			error	: function(item) {
				var error = item.responseJSON.errors.name[0];
				$("#modal-danger  .modal-title").text('Ошибка');
				$("#modal-danger  .modal-body p").text(error);
				$("#modal-danger").modal('show');
			}
		});		
	});
	
	$('body').on('click','.js-game-add', function(e) {
		e.preventDefault();
		var csrf = $("meta[name=csrf-token]").attr("content");
		var data = $("#form-items").serialize();
		
		var fd = new FormData();		
		fd.append('_token', csrf);		
		fd.append('data', data);
		
		var img = $("#image")[0].files[0];
		fd.append('image', img);	
		
		$.ajax({
			url			: "/dashboard/mech/line/store",
			data 		: fd, //
			type 		: "POST",
			dataType	: 'json',
			processData : false,
			contentType : false,
			success 	: function(data) {
				$table.bootstrapTable('refresh');
				$("#modal-default").modal('hide');
			},
			error 		: function(item) {				
				var error = (item.responseJSON.error) ? item.responseJSON.error : item.responseJSON;
				$("#modal-danger  .modal-title").text('Ошибка');
				$("#modal-danger  .modal-body p").text(error);
				$("#modal-danger").modal('show');
			}
		});
	});
})
