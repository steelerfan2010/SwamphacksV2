function calculateMaxWin() {
    var one = $('#number1').text();
    var two = $('#number2').text();
    var three = $('#number3').text();
    var four = $('#number4').text();
    var five = $('#number5').text();
    var powerball = $('#powerball').text();

    var regularNumbers = [];
    regularNumbers.push(one);
    regularNumbers.push(two);
    regularNumbers.push(three);
    regularNumbers.push(four);
    regularNumbers.push(five);

    doBestWinningsQuery(regularNumbers, powerball, up);
}

function up(json) {
    console.log(json);
}