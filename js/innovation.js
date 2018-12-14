var i = 1;
var qLength;
var innovationQs = [];
window.innovationCalc = function() {
    qLength = $("#q" + i).children('.queriesRow').length;
    var formQuery;
    var val = 0;
    for (var j = 0; j < qLength; j++) {
        formQuery = $("#q" + i).children('.queriesRow')[j];
        val = val + parseFloat($(formQuery).children().find('input[type=radio]:checked').val());
    }
    innovationQs.push(val);

    $("#q" + i).replaceWith($('#q' + (i + 1)));
    i++;

    if (i == 5) {

        var innovationScore = 0;
        for (var z in innovationQs) { innovationScore += innovationQs[z]; }
        localStorage.setItem('innovationScore', innovationScore);
        $(".butn-teamAndCollab").css('display', 'none');
        displayPage('respekt');
    }
}