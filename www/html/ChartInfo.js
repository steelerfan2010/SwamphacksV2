function extractRegularNumbers(json) {
	var numbers = []

	for(var i in json) {
		numbers.push(json[i].regularNumber)
	}

	return numbers
}

function extractPowerballNumbers(json) {
	var numbers = []

	for(var i in json) {
		numbers.push(json[i].powerballNumber)
	}

	return numbers
}

function extractFrequency(json) {
	var frequency = []

	for(var i in json) {
		frequency.push(json[i].frequency)
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
