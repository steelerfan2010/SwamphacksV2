function getDatesForSystem(number) {
    //disable dates and other shit
    doDatesOfSystemQuery(number, addStartDates);
    doDatesOfSystemQuery(number, addEndDates);
}

function addStartDates(json) {
    var i;
    var dropDown = $('#startDates');
    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DATES + "</option>");
    }
}

function addEndDates(json) {
    var i;
    var dropDown = $('#endDates');
    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DATES + "</option>");
    }
}