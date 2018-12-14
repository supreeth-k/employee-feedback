var i = 1;
var qLength;
var deliveryQs = [];
window.deliveryCalc = function() {
    qLength = $("#q" + i).children('.queriesRow').length;

    var formQuery;
    var val = 0;
    for (var j = 0; j < qLength; j++) {
        formQuery = $("#q" + i).children('.queriesRow')[j];
        val = val + parseFloat($(formQuery).children().find('input[type=radio]:checked').val());
    }

    deliveryQs.push(val);

    storeScore(i,val,'Delivering Excellence');

    $("#q" + i).replaceWith($('#q' + (i + 1)));

    i++;

    if (i == 5) {
        var deliveryScore = 0;
        for (var z in deliveryQs) { deliveryScore += deliveryQs[z]; }
        localStorage.setItem('deliveryScore', deliveryScore);
        $(".butn-teamAndCollab").css('display', 'none');
        displayPage('summary');
    }

}