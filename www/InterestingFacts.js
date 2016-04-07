 function graphJackpotLine(json) {
 	var years = getYears(json);
 	var jackpots = getJackpotAmount(json);

    /*
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
    */
    var chart = new Chartist.Line('#jackpotLineGraph', {
        labels: years,
          series: [jackpots]
    }, {
          low: 0,
          height: 400,
        chartPadding: 60,
        labelOffset: 50,
          showArea: true,
          showPoint: false,
          fullWidth: true
    });

    chart.on('draw', function(data) {
          if(data.type === 'line' || data.type === 'area') {
                  data.element.animate({
                            d: {
                                        begin: 2000 * data.index,
                              dur: 3500,
                              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                              to: data.path.clone().stringify(),
                              easing: Chartist.Svg.Easing.easeOutQuint
                            }
                                   });
                    }
    });
 }

function graphMostCommonNumbers(json) {
    var lottoNumbers = getLottoNumber(json);
	var count = getCount(json);
    var newScale = [225, 250, 275];

	var data = {
		labels: lottoNumbers,
		series: [
            count
		]
	};

	var options = {
        low: 225,
		height: 400,
        chartPadding: 60,
        labelOffset: 50
	};

	new Chartist.Bar('#mostCommonNumbers', data, options);
}

function graphThreeRuns(json) {
    var numbers = concateLottoNumbers(json);
    var frequency = getFrequency(json);

    var data = { 
        labels: numbers,
        series: [frequency]
    };

    var options = {
        horizontalBars: true,
        chartPadding: 30,
        labelOffset: 50, 
        height: 400
    };

    new Chartist.Bar('#threeRuns', data, options);
}

function graphPairs(json) {
    var pairs = concatePairs(json);
    var count = getCount(json); 

    var data = {
        labels: pairs,
        series: [count]
    };

    var options = {
        horizontalBars: true,
        low: 32,
        chartPadding: 30,
        labelOffset: 50,
        height: 400
    };

    new Chartist.Bar('#pairs', data, options);
}

function graphTGD(json) {
    var triplets = concateLottoNumbers(json);
    var count = getCount(json);

    var data = {
        labels: triplets,
        series: [count]
    };

    var options = {
        low: 6, 
        horizontalBars: true,
        chartPadding: 30,
        labelOffset: 50,
        height: 400
    };

    new Chartist.Bar('#trips', data, options);
}

function graphPercentEvenOdd(json) {
    var data = {
      labels: ['Even', 'Odd'],
      series: [json[0].PERCENTEVEN, json[0].PERCENTODD]
    };

    var options = {
        height: 300
    };

    new Chartist.Pie('#percentEvenOdd', data, options);
}

function graphAllEvenOrOdd(json) {
    var data = {
      labels: ['Even', 'Odd'],
      series: [json[0].NUMALLEVEN, json[0].NUMALLODD]
    };

    var options = {
        height: 300
    };

    new Chartist.Pie('#allEvenOrOdd', data, options);
}

function concatePairs(json) {
    var concateLottoNumbers = [];

    for(var i in json) {
        concateLottoNumbers.push("(" + json[i].LOTTONUMBER1 + "," 
                + json[i].LOTTONUMBER2 + ")" );
    }

    return concateLottoNumbers;
}

function concateLottoNumbers(json) {
    var concateLottoNumbers = [];

    for(var i in json) {
        concateLottoNumbers.push("(" + json[i].LOTTONUMBER1 + "," 
                + json[i].LOTTONUMBER2 + "," + json[i].LOTTONUMBER3 + ")" );
    }

    return concateLottoNumbers;
}

function getFrequency(json) {
    var frequency = [];

    for(var i in json) {
        frequency.push(json[i].FREQUENCY);
    }

    return frequency;
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
    var c = doThreeRunsQuery(10, graphThreeRuns);
    var d = doPairsQuery(10, graphPairs);
    var e = doTripletsQuery(10, graphTGD);
    var f = doPercentEvenOddQuery(graphPercentEvenOdd);
    var g = doAllEvenOrOddQuery(graphAllEvenOrOdd);

    $.when(a,b,c,d,e,f,g).then(function()  {
        var z = document.getElementsByClassName("ct-label");
        var i;
        for(i = 0; i < z.length; i++) {
            console.log(z[i]);
            z[i].style.fontSize = "12px";
        }
    });
}
