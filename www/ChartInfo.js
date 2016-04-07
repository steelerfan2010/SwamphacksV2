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
//		width: 1000,
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
	//	width: 1000,
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

function assignNumbers() {
    doPrediction();
    assignRandomNumbers();
}

function doPrediction(){
	var prediction = generatePrediction(regNums, pbNums, 69, 26);
	console.log(prediction);
	document.getElementById("n1").innerHTML = prediction.regularPrediction[0];
	document.getElementById("n2").innerHTML = prediction.regularPrediction[1];
	document.getElementById("n3").innerHTML = prediction.regularPrediction[2];
	document.getElementById("n4").innerHTML = prediction.regularPrediction[3];
	document.getElementById("n5").innerHTML = prediction.regularPrediction[4];
	document.getElementById("pb").innerHTML = prediction.powerballPrediction;
}

function assignRandomNumbers() {
    var numbers = getRandomNumbers();
    document.getElementById("rand1").innerHTML = numbers[0];
    document.getElementById("rand2").innerHTML = numbers[1];
    document.getElementById("rand3").innerHTML = numbers[2];
    document.getElementById("rand4").innerHTML = numbers[3];
    document.getElementById("rand5").innerHTML = numbers[4];
    document.getElementById("randPb").innerHTML = numbers[5];
}

function getRandomNumbers() {
    var numbers = [];
    var i;
    var numberSet = new Set();
    while(numberSet.size < 5) {
        numberSet.add(getRandomIntInclusive(1, 69));
    }
    numbers = Array.from(numberSet);
    Array.sort(numbers);

    numbers.push(getRandomIntInclusive(1, 26));
    return numbers;    
}

function getRandomIntInclusive(min, max) {
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      if(number < 10) {
        number = "0" + number;
      }
      return number;
}

function populateMainPage(){
	var a = doFrequencyQuery("2015-09-07", "2016-09-07", 0, setRegNums);
	var b = doFrequencyQuery("2015-09-07", "2016-09-07", 1, setPbNums);
	
	$.when(a,b).then(function(){
		graphRegularFrequency(regNums);
		graphPowerballFrequency(pbNums);
		assignNumbers();
	});
	
}
