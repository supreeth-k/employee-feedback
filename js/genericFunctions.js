window.displayPage = function(pageName) {

    window.open(window.location.origin + '/html/' + pageName + '.html', "_self")

}

window.storeScore = function(i,val, titleStr) {

var header;
 	var empDetails = JSON.parse(localStorage.getItem('empDetails'));
	
	if(i == 1) {
		
   	 var titleData = {
    	title: titleStr,
		empID:empDetails.empId,
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
        empID:empDetails.empId,
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
	
   	 var data = {
		empID:empDetails.empId
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
