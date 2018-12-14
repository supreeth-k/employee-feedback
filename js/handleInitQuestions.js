$(function() {

	var userAction;

	$("#initQueries").click(function() {
		userAction = $('input[name=initRadioButton]:checked').val();
			$.ajax({
            type: 'GET',
            url: '/employeeDetails/'+userAction,
            contentType: "application/json;charset=utf-8",
           
            success: function(res){
                console.log(res);
                $('html').html(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });
	})
})



