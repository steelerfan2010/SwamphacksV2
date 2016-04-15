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
    insertionSort(numbers);

    numbers.push(getRandomIntInclusive(1, 26));
    return numbers;    
}

function insertionSort (a) {
    for (var i = 0; i < a.length; i++) {
        var k = a[i];
        for (var j = i; j > 0 && k < a[j - 1]; j--)
            a[j] = a[j - 1];
        a[j] = k;
    }
    console.log(a);
    return a;
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
    displayTotalTuples();
	
	$.when(a,b).then(function(){
		assignNumbers();
	});
	
}

function displayTotalTuples() {
    doGetTotalTuples(displayTupleTable);
}

function displayTupleTable(json) {
    console.log(json);
    var tableName = extractTableName(json);
    var count = extractCount(json);

    var table = document.getElementById("tupleTable");

    var i;
    for(i = 1; i < tableName.length + 1; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = tableName[i - 1];
        cell2.innerHTML = count[i - 1];
    }

    /*
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "TOTAL TUPLES";
    cell2.innerHTML = getSum(json);
    */

    var totalTuples = document.getElementById("totalTuples");
    totalTuples.innerHTML = getSum(json);
}

function getSum(json) {
    var sum = 0;

    for(var i in json) {
        sum += parseInt(json[i].COUNT);
    }

    return sum;
}

function extractCount(json) {
	var count = [];

	for(var i in json) {
		count.push(json[i].COUNT);
	}

	return count;
}

function extractTableName(json) {
	var tableName = [];

	for(var i in json) {
		tableName.push(json[i].TABLE_NAME);
	}

	return tableName;
}
