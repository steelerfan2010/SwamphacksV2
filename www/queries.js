function doFrequencyQuery(startDate, endDate, numberType, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'frequency',
			   'startDate':startDate,
			   'endDate':endDate,
			   'numberType':numberType
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doDatesQuery(callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'dates'}, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doDatesOfSystemQuery(systemNumber, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'datesOfSystem',
			   'systemNumber':systemNumber
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doSumJackpotQuery(winDate, tableName, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'sumJackpot',
			   'winDate':winDate,
			   'tableName':tableName
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doBestWinningsQuery(regNumsArr, pbNum, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'bestWinnings',
			   'rn1':regNumsArr[0],
			   'rn2':regNumsArr[1],
			   'rn3':regNumsArr[2],
			   'rn4':regNumsArr[3],
			   'rn5':regNumsArr[4],
			   'pbNum':pbNum
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doFrequencyInSystemQuery(startDate, endDate, numberType, systemNumber, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'frequencyInSystem',
			   'startDate':startDate,
			   'endDate':endDate,
			   'numberType':numberType,
			   'systemNumber':systemNumber
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doJackpotPerYearQuery(callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'jackpotPerYear'}, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

//--------------------

function doMostCommonNumbersQuery(numRows, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'mostCommonNumbers',
			   'numRows':numRows
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doThreeRunsQuery(numRows, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'threeRuns',
			   'numRows':numRows
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doFourRunsQuery(callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'fourRuns'
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doPairsQuery(numRows, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'pairs',
			   'numRows':numRows
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doTripletsQuery(numRows, callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'triplets',
			   'numRows':numRows
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doPercentEvenOddQuery(callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'percentEvenOdd'
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doAllEvenOrOddQuery(callback) {
	return $.ajax({
		type: "GET", //Type of post
		url: "query.php", //Where it is sent
		dataType: "json",
		data: {'queryType':'allEvenOrOdd'
			  }, //This is sent TO THE SERVER
		success: function (msg) { //Msg is returned FROM THE SERVER!
			callback(msg);
		}
	});
}

function doGetTotalTuples(callback) {
    return $.ajax({
        type: "GET",
        url: "query.php",
        dataType: "json",
        data: {'queryType':'getTotalTuples'},
        success: function (msg) {
            callback(msg);
        }
    });
}

