function genPage(){
	var id = 1;
	var count = 2000;
	
	//document.getElementById("sys1").innerHTML = JSON.stringify(doBestWinningsQuery([1,2,3,4,5],6,console.log));
	
	/*for(var i=0; i<100; i++){
		document.getElementById("sys1").innerHTML = document.getElementById("sys1").innerHTML + genRandNumBetween(5, 10, [10,9,8,7]) + "<br>";
	}*/
	
	genSystem("1990-01-01", "1997-11-01", 45, 45, 1, count, id);
	id = id + count;
	genSystem("1997-11-05", "2002-10-05", 49, 42, 2, count, id);
	id = id + count;
	genSystem("2002-10-09", "2005-08-27", 53, 42, 3, count, id);
	id = id + count;
	genSystem("2005-08-31", "2009-01-03", 55, 42, 4, count, id);
	id = id + count;
	genSystem("2009-01-07", "2012-01-14", 59, 39, 5, count, id);
	id = id + count;
	genSystem("2012-01-18", "2015-10-03", 59, 35, 6, count, id);
	id = id + count;
	genSystem("2015-10-07", "2020-01-01", 69, 26, 7, count, id);
}

function genSystem(sDate, eDate, maxReg, maxPb, sysNum, count, idStart){
	
	var predObj = {regNums: null, pbNums: null, maxReg: maxReg, maxPb: maxPb};
	var a = doFrequencyQuery(sDate, eDate, 0, setRegNums(predObj));
	var b = doFrequencyQuery(sDate, eDate, 1, setPbNums(predObj));
	var fullStr = "";

	$.when(a,b).then(function(){
		for(var i=0; i<count; i++){
			var prediction = generatePrediction(predObj.regNums, predObj.pbNums, predObj.maxReg, predObj.maxPb);
			var str = genTableInsertion("GeneratedTickets", prediction, idStart+i, sysNum);
			fullStr = fullStr + str;
			//document.getElementById("sys"+sysNum).innerHTML = document.getElementById("sys"+sysNum).innerHTML + str;
		}
		
		for(var i=0; i<count; i++){
			var prediction = randPrediction(maxReg,maxPb);
			var str = genTableInsertion("RandomTickets", prediction, idStart+i, sysNum);
			fullStr = fullStr + str;
			//document.getElementById("sys"+sysNum).innerHTML = document.getElementById("sys"+sysNum).innerHTML + str;
		}
		
		document.getElementById("sys"+sysNum).innerHTML = fullStr;
	});
		
}

function setRegNums(obj){
	return function(regNums){
		obj.regNums = regNums;
	}
}

function setPbNums(obj){
	return function(pbNums){
		obj.pbNums = pbNums;
	}
}

function randPrediction(maxReg, maxPb){
	var notArray = [];
	var regularPrediction = [];
	
	for(var i=0; i<5; i++){
		var n = genRandNumBetween(1, maxReg, notArray);
		notArray.push(n);
		
		var nStr = n.toString();
		if(nStr.length == 1){
			nStr = "0"+nStr;
		}
		
		regularPrediction.push(nStr);
	}
	
	var p = genRandNumBetween(1, maxPb, []);

	var pStr = p.toString();
	if(pStr.length == 1){
		pStr = "0"+pStr;
	}

	var powerballPrediction = pStr;
	
	return {regularPrediction: regularPrediction, powerballPrediction: powerballPrediction};
}

function genRandNumBetween(min, max, notArray){
	var num = Math.floor(Math.random()*(max-min + 1)) + min;
	while(~notArray.indexOf(num)){
		num = Math.floor(Math.random()*(max-min + 1)) + min;
	}
	return num;
}

function genTableInsertion(tableName, prediction, tid, system){
	
	var str = "";
	
	for(var i=0; i<5; i++){
		str = str + "INSERT INTO " + tableName + " (tid, lottoNumber, numberType, systemNumber) VALUES (" 
			+ tid + ", " + prediction.regularPrediction[i] + ", 0, " + system + ");<br>";
	}
	str = str + "INSERT INTO " + tableName + " (tid, lottoNumber, numberType, systemNumber) VALUES (" 
		+ tid + ", " + prediction.powerballPrediction + ", 1, " + system + ");<br><br>";
	
	return str;
	
}