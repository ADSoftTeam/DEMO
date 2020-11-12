function confirm_delete(text, js_class, param) {	
	if (typeof js_class != typeof undefined) {
		var btn = $('#modal-warning button.btn-outline:eq(1)');
		btn.removeClass();
		btn.addClass('btn btn-outline '+js_class);// добавим стандартные + свой		
	}
	$("#modal-warning .modal-body p").html(text);
	$("#modal-warning").modal('show');	
	if (typeof param != typeof undefined) {
		btn.data('param',param);		
	}
}