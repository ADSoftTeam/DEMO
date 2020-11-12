function valueFormatter(value, row) {	    
	var out = '-';
	switch(row.type) {
		case "string" :
			out = row.value;
		break;
		case "text" :
			out = row.value;
		break;
		case "array" :
			out = '[ '+row.value.replace(/\|/g,", ") +' ]';
		break; 
		case "image" :
			out = (!row.value) 
				? '<img src="/storage/no_foto.jpg" />' 
				: '<a href="/storage/'+ row.value + '" data-toggle="lightbox"><img src="/storage/'+ row.value + '" height="50px"></a>';
		break;
		
	}
	return out;
}

function TypeFormatter(value) {
	var titles = {string:'строка', text:'текст',image:'изображение',array:'массив'};
		
	return titles[value];
}

function actionFormatter(value, row, index) {
    return [
        '<a href="#" data-type="'+ row.type +'" data-game="' + row.game_id + '" data-id="' + row.id + '" title="Редактировать" class="js-add-item">',
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
			url		: "/dashboard/game-item/"+id,
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
		var type = $(this).data('type');
		var game = $(this).data('game');
		var edit = $(this).data('id');
		//var csrf = $("meta[name=csrf-token]").attr("content");
		$.ajax({
			url		: "/dashboard/game/add",
			data 	: {'slug' : game, 'type' : type, 'id' : edit },
			type	: "GET",
			success: function (data) {				
				$("#modal-default  .modal-title").text(edit ? 'Редактирование элемента игры' : 'Добавление нового элемента игры');
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
		var type = $("#form-items-type").val();
		var fd = new FormData();		
		fd.append('_token', csrf);		
		fd.append('data', data);
		
		if (type == "image") {
			var img = $("#image")[0].files[0];
			fd.append('image', img);
		}	
		
		$.ajax({
			url			: "/dashboard/game-item/store",
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
				var error = item.responseJSON.error;
				$("#modal-danger  .modal-title").text('Ошибка');
				$("#modal-danger  .modal-body p").text(error);
				$("#modal-danger").modal('show');
			}
		});
	});
})
