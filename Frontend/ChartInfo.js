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
	var num = extractPowerballNumbers(json2)
	var freq = extractFrequency(json2)

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
