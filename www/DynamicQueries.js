function getDatesForSystem() {
    var number = $('#dynamicSystemNumber').val();

     $('#startDates').prop("disabled", true);
     $('#endDates').prop("disabled", true);

    var a = doDatesOfSystemQuery(number, updateDates);
    
    $.when(a).then(function() {
        $('#startDates').prop("disabled", false);
        $('#endDates').prop("disabled", false);
    });
}

function updateDates(json) {
    addStartDates(json);
    addEndDates(json);
}

function addStartDates(json) {
    var i;
    var dropDown = $('#startDates');

    dropDown.children().remove();

    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DRAWINGDATE + "</option>");
    }
}

function addEndDates(json) {
    var i;
    var dropDown = $('#endDates');

    dropDown.children().remove();

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
    var a = doFrequencyInSystemQuery(startDate, endDate, 0, extractedSystemNumber, setGenReg);
    var b = doFrequencyInSystemQuery(startDate, endDate, 1, extractedSystemNumber, setGenPower);

    $.when(a,b).then(function() {
        document.getElementsByClassName("title")[0].style.visibility = "visible";
        document.getElementsByClassName("title")[1].style.visibility = "visible";

        graphRegular(regularNumbers);
        graphPower(powerballNumbers);
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

function graphRegular(json) {
	var num = extractRegularNumbers(json);
	var freq = extractFrequency(json);

	var data = {
		labels: num,
		series: [
			freq
		]
	};

	var options = {
		height: 200
	};

	new Chartist.Bar(regularChart, data, options);
}

function graphPower(json) {
	var num = extractPowerballNumbers(json);
	var freq = extractFrequency(json);

	var data = {
		labels: num,
		series: [
			freq
		]
	};

	var options = {
		height: 200
	};

	new Chartist.Bar('#powerballChart', data, options);
}
