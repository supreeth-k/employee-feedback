$(function() {

    $('input[type=radio][name=bedStatus]').change(function() {
        if (this.value == 'evalSub') {
         $("#selfEmpId").css('display', 'block');
        }
        else {
            $("#selfEmpId").css('display', 'none');
        }
    });

	var userAction;

	$("#initQueries").click(function() {
		userAction = $('input[name=initRadioButton]:checked').val();
			$.ajax({
            type: 'GET',
            url: '/employeeDetails/'+userAction,
            contentType: "application/json;charset=utf-8",
           
            success: function(res){
                location.href = location.href + 'html/employeeDetails.html';
            },
            error:function(err) {
                console.log(err);
            }   
        });
	})
})



