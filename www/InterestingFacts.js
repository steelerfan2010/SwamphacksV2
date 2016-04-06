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
 //		width: 1000,
 		height: 200,
        low: 0,
        showArea: true
 	};

 	new Chartist.Line('#jackpotLineGraph', data, options);
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
}

