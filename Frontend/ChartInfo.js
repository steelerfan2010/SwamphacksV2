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
