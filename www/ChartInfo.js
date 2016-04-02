function extractRegularNumbers(json) {
	var numbers = [];

	for(var i in json) {
		numbers.push(json[i].LOTTONUMBER);
	}

	return numbers;
}

function extractPowerballNumbers(json) {
	var numbers = [];

	for(var i in json) {
		numbers.push(json[i].LOTTONUMBER);
	}

	return numbers;
}

function extractFrequency(json) {
	var frequency = [];

	for(var i in json) {
		frequency.push(json[i].FREQUENCY);
	}

	return frequency;
}

function graphRegularFrequency(json) {
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

	new Chartist.Bar('#chart', data, options);
}

function graphPowerballFrequency(json) {
	var num = extractPowerballNumbers(json);
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

	new Chartist.Bar('#chart2', data, options);
}

var regNums;
var pbNums;
var haveRegNums = false;
var havePbNums = false;

function setRegNums(json){
	regNums = json;
	haveRegNums = true;
}

function setPbNums(json){
	pbNums = json;
	havePbNums = true;
}

function doPrediction(){
	if(haveRegNums && havePbNums){
		var prediction = generatePrediction(regNums, pbNums, 69, 26);
		document.getElementById("n1").innerHTML = prediction.regularPrediction[0];
		document.getElementById("n2").innerHTML = prediction.regularPrediction[1];
		document.getElementById("n3").innerHTML = prediction.regularPrediction[2];
		document.getElementById("n4").innerHTML = prediction.regularPrediction[3];
		document.getElementById("n5").innerHTML = prediction.regularPrediction[4];
		document.getElementById("pb").innerHTML = prediction.powerballPrediction;
	}
}

function populateMainPage(){
	var a = doFrequencyQuery("2015-09-07", "2016-09-07", 0, setRegNums);
	var b = doFrequencyQuery("2015-09-07", "2016-09-07", 1, setPbNums);
	
	$.when(a,b).then(function(){
		
		graphRegularFrequency(regNums);
		graphPowerballFrequency(pbNums);
		doPrediction();
		
	});
	
}
