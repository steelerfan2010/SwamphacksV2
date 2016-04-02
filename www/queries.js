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