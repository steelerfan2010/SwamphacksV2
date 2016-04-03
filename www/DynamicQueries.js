function getDatesForSystem(number) {
    //disable dates and other shit
    doDatesOfSystemQuery(number, addDatesToDropdownForSystem);
}

function addDatesToDropdownForSystem(json) {
    var i;
    var dropDown = $('#systemDates');
    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DATES + "</option>");
    }
}