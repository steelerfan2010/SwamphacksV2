function getRegNums2(json){
	regNums = json;
	haveRegNums = true;
	doPrediction2();
}

function getPbNums2(json){
	pbNums = json;
	havePbNums = true;
	doPrediction2();
}

function doPrediction2(){
	if(haveRegNums && havePbNums){
		var prediction;
		
		for(var i=0; i<5; i++){
			prediction = generatePrediction(regNums, pbNums, 69, 26);
			genTableInsertion("GeneratedTickets", prediction, i, 7);
		}
	}
}

function genTableInsertion(tableName, prediction, tid, system){
	
	var str = "";
	
	for(var i=0; i<5; i++){
		str = str + "INSERT INTO " + tableName + " (tid, number, numberType, system) VALUES (" 
			+ tid + ", " + prediction.regularPrediction[i] + ", 0, " + system + ");<br>"
	}
	str = str + "INSERT INTO " + tableName + " (tid, number, numberType, system) VALUES (" 
		+ tid + ", " + prediction.powerballPrediction + ", 1, " + system + ");<br><br>"
	
	document.write(str);
	
}