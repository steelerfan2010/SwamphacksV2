function generatePrediction(regularNumbers, powerballNumbers, maxRegNum, maxPbNum){
	regNumList = [];
	for(i = 1; i <= maxRegNum; i++){
		regNumList.push(i);
	}
	for(i = 0; i < regularNumbers.length; i++){
		for(j = 0; j < regularNumbers[i].frequency; j++){
			regNumList.push(parseInt(regularNumbers[i].regularNumber));
		}
	}
	
	pbNumList = [];
	for(i = 1; i <= maxPbNum; i++){
		pbNumList.push(i);
	}
	for(i = 0; i < powerballNumbers.length; i++){
		for(j = 0; j < powerballNumbers[i].frequency; j++){
			pbNumList.push(parseInt(powerballNumbers[i].powerballNumber));
		}
	}
	
	var numsObj;
	var regularPrediction = [];
	for(var i = 0; i < 5; i++){
		numsObj = pickNumber(regNumList);
		regNumList = numsObj.adjustedNumbers;
		var randNumString = numsObj.randNum.toString();
		if(randNumString.length == 1){
			randNumString = "0"+randNumString;
		}
		regularPrediction.push(randNumString);
	}
	
	var powerballPrediction = pickNumber(pbNumList).randNum.toString();
	if(powerballPrediction.length == 1){
		powerballPrediction = "0"+powerballPrediction;
	}
	
	return {regularPrediction:regularPrediction, powerballPrediction:powerballPrediction};
	
}

function pickNumber(numbers){
	var len = numbers.length;
	var randIndex = Math.floor((Math.random() * len));
	var randNum = numbers[randIndex];
	
	var adjustedNumbers = [];
	for(var i = 0; i < numbers.length; i++){
		if(numbers[i] != randNum){
			adjustedNumbers.push(numbers[i]);
		}
	}
	
	return {randNum:randNum, adjustedNumbers:adjustedNumbers};
}