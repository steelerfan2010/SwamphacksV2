function populateMainPage(){
	var a = doFrequencyQuery("2015-09-07", "2016-09-07", 0, setRegNums);
	var b = doFrequencyQuery("2015-09-07", "2016-09-07", 1, setPbNums);

	$.when(a,b).then(function(){
		graphRegularFrequency(regNums);
		graphPowerballFrequency(pbNums);
		assignNumbers();
	});

}

function getAllDates() {
    var a = doDatesQuery(setDates);

    $.when(a).then(function(){
        doWork();
    });
}

function doWork() {
    console.log("hey");
    document.getElementById("yo").innerHTML = "boobs";
}

var gotDates;
var haveDates= false;

function setDates(json){
	gotDates = json;
	haveDates = true;
}