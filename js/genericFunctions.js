window.displayPage = function(pageName) {

    window.open(window.location.origin + '/html/' + pageName + '.html', "_self")

}

window.feedBackBy = function(userAction) {


    var empDetails = JSON.parse(localStorage.getItem('empDetails'));
    var userAction = JSON.parse(localStorage.getItem('userAction'));

    var empId = empDetails?empDetails.empId:JSON.parse(localStorage.getItem('subEmpId'));


    var data = {
        empID:empId,
        userAction:userAction 
    }
      $.ajax({
            type: 'POST',
            url: '/feedbackBy',
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(data),
           
            success: function(res){
                console.log(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });
}

window.storeScore = function(i,val, titleStr) {

    var header;
 	var empDetails = JSON.parse(localStorage.getItem('empDetails'));
    var userAction = JSON.parse(localStorage.getItem('userAction'));

    var empId = empDetails?empDetails.empId:JSON.parse(localStorage.getItem('subEmpId'));
	
	if(i == 1) {
		
   	 var titleData = {
    	title: titleStr,
		empID:empId,
        userAction:userAction
	}
	     $.ajax({
            type: 'POST',
            url: '/insertTitle',
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(titleData),
           
            success: function(res){
                console.log(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });
	}

	var displayState = $("#q" + i).find('.queryHeader').css('display');
    
    if(displayState == 'block') {
       header = $("#q" + i).find('.queryHeader').text();
    }

    var data = {
        header:header,
        val:val,
        empID:empId,
        userAction:userAction
    }
        $.ajax({
            type: 'POST',
            url: '/individualSummary',
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(data),
           
            success: function(res){
                console.log(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });


    $("#q" + i).replaceWith($('#q' + (i + 1)));
    $("#q" + (i + 1)).find('.queryHeader').css('display','block');
    $("#q" + i).find('.queryHeader').css('display','none');
}

window.insertNewLine = function () {

	var empDetails = JSON.parse(localStorage.getItem('empDetails'));
    var empId = empDetails?empDetails.empId:JSON.parse(localStorage.getItem('subEmpId'));
	
   	 var data = {
		empID:empId
	}

	    $.ajax({
            type: 'POST',
            url: '/newLine',
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(data),
           
            success: function(res){
                console.log(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });

}

window.isFeedbackGiven = function (empId) {
    
     var data = {
        empID:empId
    }

        $.ajax({
            type: 'POST',
            url: '/isFeedbackGiven',
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(data),
           
            success: function(res){
                console.log(res);
                if(res == 'Error') {
                    alert("Feedback has already been given for this employee!")
                    return;
                }
                else if(res == 'Empty') {
                    alert('The employee ID you have entered is invalid. Please enter the correct ID');
                }
                else displayPage('teamAndCollab')
            },
            error:function(err) {
                console.log(err);
            }   
        });

}




