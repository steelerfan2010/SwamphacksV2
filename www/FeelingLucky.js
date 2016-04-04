function calculateMaxWin() {
    var one = $('#number1').val();
    var two = $('#number2').val();
    var three = $('#number3').val();
    var four = $('#number4').val();
    var five = $('#number5').val();
    var powerball = $('#powerball').val();

    var regularNumbers = [];
    regularNumbers.push(one);
    regularNumbers.push(two);
    regularNumbers.push(three);
    regularNumbers.push(four);
    regularNumbers.push(five);

    console.log(regularNumbers);
    doBestWinningsQuery(regularNumbers, powerball, getMaxWin);
}

function getMaxWin(json) {
    var feelingLucky = document.getElementById("feelingLuckyResults");
    feelingLucky.innerHTML = "On " + json[0].DRAWINGDATE + " you would have won $" + json[0].WINNINGS + " dollars";
}
