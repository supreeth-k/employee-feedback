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

    storeScore(i,val,'Team Work and Collaboration');

    $("#q" + i).replaceWith($('#q' + (i + 1)));
    i++;

    if (i == 5) {
        var teamAndCollabScore = 0;
        for (var z in teamAndCollabqs) { teamAndCollabScore += teamAndCollabqs[z]; }
        localStorage.setItem('teamAndCollabScore', teamAndCollabScore);
        $(".butn-teamAndCollab").css('display', 'none');
        displayPage('transparency');
    }

}