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



