function valueFormatter(value, row) {	
	return (!value) ? '-' : value;
}

function imageFormatter(value) {
	var out = (!value) 
				? '<img src="/storage/no_foto.jpg" />' 
				: '<a href="/storage/'+ value + '" data-toggle="lightbox"><img src="/storage/'+ value + '" height="50px"></a>';	
	return out;
}


function actionFormatter(value, row, index) {

    return [
        '<a href="#" class="js-add-item" data-id="'+ row.id + '" title="Редактировать">',
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
			url		: "/dashboard/mech/line/"+id,
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
		var id = $(this).data('id') ? '/'+$(this).data('id') : '';		
		
		$.ajax({
			url		: "/dashboard/mech/line/form"+id,
			data 	: {'mech_id' : mech_id },
			type	: "GET",
			success: function (data) {				
				$("#modal-default  .modal-title").text(id ? 'Редактирование строки характеристи меха ('+mech_name+')' : 'Добавление новой строки характеристик меха ('+mech_name+')');
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
		var data = $("#form-items-row").serialize();
		
		$.ajax({
			url			: "/dashboard/mech/line/store",
			data 		: {'_token' : csrf, 'data' : data},
			type 		: "POST",
			dataType	: 'json',
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
