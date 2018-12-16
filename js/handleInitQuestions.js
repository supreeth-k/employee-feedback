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
        localStorage.setItem('userAction', JSON.stringify(userAction));

        if(userAction == 'evalSub') {

        var subEmpId = $(".input-subEmpId").val();

        localStorage.setItem('subEmpId', JSON.stringify(subEmpId));

        var subEmpdata = {
            subEmpId:subEmpId,
            userAction:userAction
        }

         $.ajax({
            type: 'POST',
            url: '/employeeDetails',
            data:JSON.stringify(subEmpdata),
            contentType: "application/json;charset=utf-8",
           
            success: function(res){
                 if(res == 'Error') {
                    alert("Feedback has already been given for this employee!")
                    return;
                }
                else if(res == 'NotDone') {
                    alert("The subordinate you're evaluating hasn't given his feedback yet. Please try later")
                    return;
                }
                else location.href = location.href + 'html/teamAndCollab.html';
            },
            error:function(err) {
                 alert("The subordinate you're evaluating hasn't given his feedback yet. Please try later");
                 return;
                console.log(err);
            }   
        });
    }
        else {  
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
      }
	});
})



