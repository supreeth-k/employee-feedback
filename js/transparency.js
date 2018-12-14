var i = 1;
var qLength;
var transparencyQs = [];
var header;
window.transparencyCalc = function() {
    qLength = $("#q" + i).children('.queriesRow').length;
    var formQuery;
    var val = 0;
    for (var j = 0; j < qLength; j++) {
        formQuery = $("#q" + i).children('.queriesRow')[j];
        val = val + parseFloat($(formQuery).children().find('input[type=radio]:checked').val());
    }
    transparencyQs.push(val);

    storeScore(i,val,'Transparency');

    $("#q" + i).replaceWith($('#q' + (i + 1)));
    i++;

    if (i == 5) {
        var transparencyScore = 0;
        for (var z in transparencyQs) { transparencyScore += transparencyQs[z]; }
        localStorage.setItem('transparencyScore', transparencyScore);
        $(".butn-teamAndCollab").css('display', 'none');
        displayPage('innovation');
    }
}