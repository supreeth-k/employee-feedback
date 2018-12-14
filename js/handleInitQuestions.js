$(function() {

    $('input[type=radio][name=initRadioButton]').change(function() {
        if (this.value == 'evalSub') {
         $(".subEmpId").css('display', 'block');
        }
        else {
            $(".subEmpId").css('display', 'none');
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



