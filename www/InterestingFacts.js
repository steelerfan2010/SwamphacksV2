 function graphJackpotLine(json) {
 	var years = getYears(json);
 	var jackpots = getJackpotAmount(json);

 	var data = {
 		labels: years,
 		series: [
 			jackpots
 		]
 	};

 	var options = {
 		height: 200,
        low: 0,
        showArea: true
 	};

 	new Chartist.Line('#jackpotLineGraph', data, options);
 }

function graphMostCommonNumbers(json) {
    var lottoNumbers = getLottoNumber(json);
	var count = getCount(json);

	var data = {
		labels: lottoNumbers,
		series: [
			count
		]
	};

	var options = {
		height: 200
	};

	new Chartist.Bar('#chart', data, options);
}

function graphThreeRuns(json) {

}

function graphPercentEvenOdd(json) {
    var evenPercent = getEvenPercent(json);
    var oddPercent = getOddPercent(json);

    var data = {
      labels: ['Even', 'Odd'],
      series: [evenPercent, oddPercent]
    };

    var sum = function(a, b) { return a + b };

    new Chartist.Pie('#percentEvenOdd', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
}

function graphAllEvenOrOdd(json) {
    var evenNumbers = getNumAllEven(json);
    var oddNumbers = getNumAllOdd(json);

    var data = {
      labels: ['Even', 'Odd'],
      series: [evenNumbers, oddNumbers]
    };

    var sum = function(a, b) { return a + b };

    new Chartist.Pie('#allEvenOrOdd', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });
}

function getLottoNumber(json) {
    var lottoNumbers = [];

    for(var i in json) {
    	lottoNumbers.push(json[i].LOTTONUMBER);
    }

    return lottoNumbers;
}

function getCount(json) {
    var count = [];

    for(var i in json) {
    	count.push(json[i].CNT);
    }

    return count;
}

function getEvenPercent(json) {
    var evenPercent = [];

    for(var i in json) {
    	evenPercent.push(json[i].PERCENTEVEN);
    }

    return evenPercent;
}

function getOddPercent(json) {
    var oddPercent = [];

    for(var i in json) {
    	oddPercent.push(json[i].PERCENTODD);
    }

    return oddPercent;
}

function getNumAllEven(json) {
    var evenNumbers = [];

    for(var i in json) {
    	evenNumbers.push(json[i].NUMALLEVEN);
    }

    return evenNumbers;
}

function getNumAllOdd(json) {
    var oddNumbers = [];

    for(var i in json) {
    	oddNumbers.push(json[i].NUMALLODD);
    }

    return oddNumbers;
}

 function getYears(json) {
    var years = [];

    for(var i in json) {
    	years.push(json[i].YEAR);
    }

    return years;
 }

 function getJackpotAmount(json) {
    var jackpots = [];

 	for(var i in json) {
 		jackpots.push(json[i].JACKPOTAMOUNT);
 	}

 	return jackpots;
 }

function populateInterestingFacts() {
    var a = doJackpotPerYearQuery(graphJackpotLine);
    var b = doMostCommonNumbersQuery(10, graphMostCommonNumbers);
//    var c = doThreeRunsQuery(10, graphThreeRuns);
    var d = doPercentEvenOddQuery(graphPercentEvenOdd);
    var e = doAllEvenOrOddQuery(graphAllEvenOrOdd);
}

