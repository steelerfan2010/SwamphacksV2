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

function generateGraphs() {
    var systemNumber = $('#dynamicSystemNumber').find(":selected").text();
    var extractedSystemNumber = systemNumber.substring(7); //just want the #
    var startDate = $('#startDates').find(":selected").text();
    var endDate = $('#endDates').find(":selected").text();

    //should verify (start < end) HERE
    var a = doFrequencyInSystemQuery(startDate, endDate, 0, systemNumber, setGenReg);
    var b = doFrequencyInSystemQuery(startDate, endDate, 1, systemNumber, setGenPower);

    $.when(a,b).then(function() {
        graph(regularChart, regularNumbers);
        graph(powerballChart, powerballNumbers);
    });

}

var regularNumbers;
var powerballNumbers;
var haveRegularNumbers = false;
var havePowerballNumbers = false;

function setGenReg(json) {
    regularNumbers = json;
    haveRegularNumbers = true;
}

function setGenPower(json) {
    powerballNumbers = json;
    havePowerballNumbers = true;
}

function graph(id, json) {
	var num = extractRegularNumbers(json);
	var freq = extractFrequency(json);

	var data = {
		labels: num,
		series: [
			freq
		]
	};

	var options = {
		width: 1000,
		height: 200
	};

	new Chartist.Bar('#\\id', data, options);
}