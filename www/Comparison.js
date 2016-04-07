/*function populateMainPage(){
	var a = doFrequencyQuery("2015-09-07", "2016-09-07", 0, setRegNums);
	var b = doFrequencyQuery("2015-09-07", "2016-09-07", 1, setPbNums);

	$.when(a,b).then(function(){
		graphRegularFrequency(regNums);
		graphPowerballFrequency(pbNums);
		assignNumbers();
	});

}*/

function getAllDates() {
    var a = doDatesQuery(addDatesToDropdown);
}

function addDatesToDropdown(json) {
    var i;
    var dropDown = $('#dropDown');
    for(i = 0; i < json.length; i++) {
        dropDown.append("<option>" + json[i].DATES + "</option>");
    }
}

function getMoneyInDateRange() {
    var date = $('#dropDown').find("option:selected").text();
    var randomSum = doSumJackpotQuery(date, "RandomTickets", updateRandomSum);
    var generatedSum = doSumJackpotQuery(date, "GeneratedTickets", updateOurSum);

    $.when(randomSum, generatedSum).then(function() {
        compareTotals();
    });
}

function updateOurSum(json) {
    $('#ourSum').text("$" + json[0].SUM);
}

function updateRandomSum(json) {
    $('#randomSum').text("$" + json[0].SUM);
}

function compareTotals() {
    var ours = $('#ourSum').text();
    var random = $('#randomSum').text();

    ours = ours.substring(1);
    random = random.substring(1);

    var ourNum = parseFloat(ours);
    var randomNum = parseFloat(random);

    var difference = ourNum - randomNum;

    if(difference >= 0) {
        $('#compareTotals').text("Our algorithm made: $" + difference + " more dollars");
        $('#compareTotals').css({"color":"green"});
    }
    else {
        difference = difference * -1;
        $('#compareTotals').text("Our algorithm made: $" + difference + " less dollars");
        $('#compareTotals').css({"color":"red"});
    }
}
