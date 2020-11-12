function imageFormatter(value, row) {
	    
	var img =  (!value) 
		? '<img src="/storage/no_foto.jpg" />' 
		: '<a href="/storage/'+ value + '" data-toggle="lightbox"><img src="/storage/'+ value + '" height="50px"></a>';
	
	return img;
}

function langFormatter(value, row, index, field) {
	var EN = (row.people[0] && row.people[0][field]) 
		? (row.people[0][field] + ' ['+row.people[0]['language']+']')
		: '-';
	
	var RU = (row.people[1] && row.people[1][field]) 
		? (row.people[1][field] + ' ['+row.people[1]['language']+']')
		: '-';
	return EN + '<br/>' + RU;
}

function actionFormatter(value, row, index) {
    return [
        '<a href="/dashboard/team/'+row.id+'/edit" title="Редактировать">',
        '<button type="button" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-edit"></i></button>',
        '</a>',
		'&nbsp;&nbsp;',
        '<a class="js-team-delete" href="#" title="Удалить">',
        '<button type="button" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-remove"></i></button>',
        '</a>'
    ].join('');
}

var actionEvents = {'click .js-team-delete': function (e, value, row, index) {	
	confirm_delete('Удалить участника?','js-team-delete-confirm',row.id);
}};


$(function () {		
	$table = $('#table');
    $table.bootstrapTable({locale:'ru-RU'});	

	$('body').on('click','.js-team-delete-confirm',function(e) {
		e.preventDefault();
		var id = $(this).data('param');		
		// посылаем запрос на бэк, если успешно удалилось - очищаем в таблице
		// delete
		var csrf = $("meta[name=csrf-token]").attr("content");
		$.ajax({
			url		: "/dashboard/team",
			data 	: {'_token' : csrf,'id' : id },
			type	: "DELETE",
			success: function (data) {				
				$table.bootstrapTable('refresh');
				$("#modal-info  .modal-title").text('Сообщение');
				$("#modal-info  .modal-body p").text(data.payload);
				$("#modal-info").modal('show');
			},
			error	: function(item) {
				var error = item.responseJSON.errors.name[0];
				$("#modal-danger  .modal-title").text('Ошибка удаления изображения');
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
})
