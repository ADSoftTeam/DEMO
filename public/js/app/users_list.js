function TextFormatter(value, row) {	    
	return (!value) ? '-' : (value.length>150 ? value.substr(0,150) + '...' : value);
}


function actionFormatter(value, row, index) {

    return [
		'<a class="js-edit-user" href="#" rel="'+row.id +'" title="Редактировать">',
        '<button type="button" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-edit"></i></button>',
        '</a>',
		'&nbsp;&nbsp;',
        '<a class="js-user-delete" href="#" title="Удалить">',
        '<button type="button" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-remove"></i></button>',
        '</a>'
    ].join('');
}

var actionEvents = {'click .js-user-delete': function (e, value, row, index) {	
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
			url		: "/dashboard/users/"+id,
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
	
	$("body").on("click",".js-add-user, .js-edit-user", function(e){
		e.preventDefault();
		// Сброс всех элементов формы
		$("form#form-users")[0].reset();
		$("#modal-default  .modal-title").text('Добавление пользователя');
		$("form#form-users").attr('rel','');
		
		// Сброс ошибок
		$('div.text-danger').remove();
		$('.has-error').removeClass('has-error');
		
		if ($(this).hasClass('js-edit-user')) {
			$("#modal-default  .modal-title").text('Редактирование пользователя');
			$("form#form-users").attr('rel',$(this).attr('rel'));console.log($(this).attr('rel'));
			get_user($(this).attr('rel'));			
		}
		
		$("#modal-default").modal('show');		
		
	});
	
	$("form#form-users").submit(function(e){
		e.preventDefault();
		$('.has-error').removeClass('has-error');
		$('div.text-danger').remove();		
		var id = ((typeof $(this).attr('rel') == typeof undefined) || ($(this).attr('rel') == '')) ? '' : '/' + $(this).attr('rel'); 
		var csrf = $("meta[name=csrf-token]").attr("content");
		var data = $(this).serialize();
		
		var fd = new FormData();		
		fd.append('_token', csrf);		
		fd.append('data', data);
				
		$.ajax({
			url		: "/dashboard/users"+id,
			data 	: fd,
			type 		: "POST",
			dataType	: 'json',
			processData : false,
			contentType : false,
			success: function (data) {
				$("#modal-default").modal('hide');
				$table.bootstrapTable('refresh');				
			},
			error	: function(item) {					
				var error = item.responseJSON;
				if (error && error.payload && !(error.payload.one_error)) {
					for (var key in error.payload) {						
						var el = $("#"+key);
						el.parent().addClass('has-error');
						el.after('<div class="small text-danger">' + error.payload[key] + '</div>');
					}				
				} else {
					var error_text = (error.payload.one_error) ? error.payload.one_error : payload.errors.value[0];
					$("#modal-danger  .modal-title").text('Ошибка добавления');
					$("#modal-danger  .modal-body p").text(error_text);
					$("#modal-danger").modal('show');
				}
			}
		});	
	});
	

	function get_user(id) {		
		$.ajax({
			url		: "/dashboard/users/"+id,			
			dataType : 'json',
			type	: "GET",
			success: function (data) {
				for (key in data) {
					var obj = $("#"+key);
					if (obj) obj.val(data[key]);					
				};
			},
			error	: function(item) {					
				var error = item.responseJSON;
				var error_text = (error.one_error) ? error.one_error : errors.value[0];
				$("#modal-danger  .modal-title").text('Ошибка');
				$("#modal-danger  .modal-body p").text(error_text);
				$("#modal-danger").modal('show');				
			}
		});	
	}
	
	$('body').on('click','.js-generate', function(e){
		console.log('gener');
		var id = $(this).parent().prev('input[type="password"]').attr('id');
		var next_id = $(this).parent().parent().parent().parent().next().children('div').children('input[type="password"]').attr('id');		
		console.log(next_id);
		var v = generate_password(8, id, next_id);		
		copyToClipboard(v);		
	});
	
	function generate_password(length = 8, pass_id, rpass_id) {
		var chars = '0123456789_@#$&ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_@#$&';
		var randomstring = '';
		for (var i=0; i<length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		
		$('#'+pass_id).val(randomstring);
		$('#'+rpass_id).val(randomstring);
		return randomstring;
	}
	
	function copyToClipboard(str) {
		var area = document.createElement('textarea');
		document.body.appendChild(area);
		area.value = str;
		area.select();
		document.execCommand("copy");
		document.body.removeChild(area);
	}
	
})
