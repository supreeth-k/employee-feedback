var i = 1;
var qLength;
var teamAndCollabqs = [];
var header;

window.teamAndCollab = function() {
    qLength = $("#q" + i).children('.queriesRow').length;
    var formQuery;
    var val = 0;
    for (var j = 0; j < qLength; j++) {
        formQuery = $("#q" + i).children('.queriesRow')[j];
        val = val + parseFloat($(formQuery).children().find('input[type=radio]:checked').val());
    }
    teamAndCollabqs.push(val);
     var displayState = $("#q" + i).find('.queryHeader').css('display');
    
    if(displayState == 'block') {
       header = $("#q" + i).find('.queryHeader').text();
    }
 var empDetails = JSON.parse(localStorage.getItem('empDetails'));

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
    i++;
    if (i == 5) {
        var teamAndCollabScore = 0;
        for (var z in teamAndCollabqs) { teamAndCollabScore += teamAndCollabqs[z]; }
        localStorage.setItem('teamAndCollabScore', teamAndCollabScore);
        $(".butn-teamAndCollab").css('display', 'none');

        $.ajax({
            type: 'GET',
            url: window.location.origin+'/trans',
            contentType: "application/json;charset=utf-8",
           
            success: function(res){
               location.href = res;
               console.log(res);
            },
            error:function(err) {
                console.log(err);
            }   
        });
        //displayPage('transparency', 'teamAndCollabScore', teamAndCollabScore);
    }

}