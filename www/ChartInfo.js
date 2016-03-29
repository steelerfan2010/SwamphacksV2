function extractRegularNumbers(json) {
	var numbers = []

	for(var i in json) {
		numbers.push(json[i].REGULARNUMBER)
	}

	return numbers
}

function extractPowerballNumbers(json) {
	var numbers = []

	for(var i in json) {
		numbers.push(json[i].POWERBALLNUMBER)
	}

	return numbers
}

function extractFrequency(json) {
	var frequency = []

	for(var i in json) {
		frequency.push(json[i].FREQUENCY)
	}

	return frequency
}

function graphRegularFrequency(json) {
	var num = extractRegularNumbers(json)
	var freq = extractFrequency(json)

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
	var num = extractPowerballNumbers(json)
	var freq = extractFrequency(json)

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

function getPowerballQuery(numberType, callback) {
	$.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'numberType':numberType}, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function generatePrediction(regularNumbers, powerballNumbers, maxRegNum, maxPbNum){
	regNumList = [];
	for(i = 1; i <= maxRegNum; i++){
		regNumList.push(i);
	}
	for(i = 0; i < regularNumbers.length; i++){
		for(j = 0; j < regularNumbers[i].frequency; j++){
			regNumList.push(parseInt(regularNumbers[i].regularNumber));
		}
	}
	
	pbNumList = [];
	for(i = 1; i <= maxPbNum; i++){
		pbNumList.push(i);
	}
	for(i = 0; i < powerballNumbers.length; i++){
		for(j = 0; j < powerballNumbers[i].frequency; j++){
			pbNumList.push(parseInt(powerballNumbers[i].powerballNumber));
		}
	}
	
	var numsObj;
	var regularPrediction = [];
	for(var i = 0; i < 5; i++){
		numsObj = pickNumber(regNumList);
		regNumList = numsObj.adjustedNumbers;
		var randNumString = numsObj.randNum.toString();
		if(randNumString.length == 1){
			randNumString = "0"+randNumString;
		}
		regularPrediction.push(randNumString);
	}
	
	var powerballPrediction = pickNumber(pbNumList).randNum.toString();
	if(powerballPrediction.length == 1){
		powerballPrediction = "0"+powerballPrediction;
	}
	
	document.getElementById("n1").innerHTML = regularPrediction[0];
	document.getElementById("n2").innerHTML = regularPrediction[1];
	document.getElementById("n3").innerHTML = regularPrediction[2];
	document.getElementById("n4").innerHTML = regularPrediction[3];
	document.getElementById("n5").innerHTML = regularPrediction[4];
	document.getElementById("pb").innerHTML = powerballPrediction;
	
	//return {regularPrediction:regularPrediction, powerballPrediction:powerballPrediction};
	
}

/*Array.prototype.sum = function () {
    for(var total = 0,l=this.length;l--;total+=this[l]); return total;
}*/

function pickNumber(numbers){
	var len = numbers.length;
	var randIndex = Math.floor((Math.random() * len));
	var randNum = numbers[randIndex];
	
	var adjustedNumbers = [];
	for(var i = 0; i < numbers.length; i++){
		if(numbers[i] != randNum){
			adjustedNumbers.push(numbers[i]);
		}
	}
	
	return {randNum:randNum, adjustedNumbers:adjustedNumbers};
}

var regNums;
var pbNums;
var haveRegNums = false;
var havePbNums = false;

function getRegNums(json){
	regNums = json;
	haveRegNums = true;
	doPrediction();
}

function getPbNums(json){
	pbNums = json;
	havePbNums = true;
	doPrediction();
}

function doPrediction(){
	if(haveRegNums && havePbNums){
		generatePrediction(regNums, pbNums, 69, 26);
	}
}
