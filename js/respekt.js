var i = 1;
var qLength;
var respektQs = [];
window.respektCalc = function() {
    qLength = $("#q" + i).children('.queriesRow').length;
    var formQuery;
    var val = 0;
    for (var j = 0; j < qLength; j++) {
        formQuery = $("#q" + i).children('.queriesRow')[j];
        val = val + parseFloat($(formQuery).children().find('input[type=radio]:checked').val());
    }
    respektQs.push(val);

    $("#q" + i).replaceWith($('#q' + (i + 1)));
    i++;

    if (i == 4) {
        var respektScore = 0;
        for (var z in respektQs) { respektScore += respektQs[z]; }
        localStorage.setItem('respektScore', respektScore);
        $(".butn-teamAndCollab").css('display', 'none');
        displayPage('delivery');
    }
}