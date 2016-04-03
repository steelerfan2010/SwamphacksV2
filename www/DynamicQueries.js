function getDatesForSystem(number) {
    //disable dates and other shit
    var a = doDatesOfSystemQuery(number, addStartDates);
    var b = doDatesOfSystemQuery(number, addEndDates);
    
    $.when(a,b).then(function() {
        $('#startDates').prop("disabled", false);
        $('#endDates').prop("disabled", false);
    });
}

function addStartDates(json) {
    var i;
    var dropDown = $('#startDates');

    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DRAWINGDATE + "</option>");
    }
}

function addEndDates(json) {
    var i;
    var dropDown = $('#endDates');

    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DRAWINGDATE + "</option>");
    }
}
