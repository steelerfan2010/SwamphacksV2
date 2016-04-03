function populateMainPage(){
	var a = doFrequencyQuery("2015-09-07", "2016-09-07", 0, setRegNums);
	var b = doFrequencyQuery("2015-09-07", "2016-09-07", 1, setPbNums);

	$.when(a,b).then(function(){
		graphRegularFrequency(regNums);
		graphPowerballFrequency(pbNums);
		assignNumbers();
	});

}

function getAllDates() {
    var a = doDatesQuery(setDates);

    $.when(a).then(function(){
       var i;
           var dropDown = $('#dropDown');
           for(i = 0; i < gotDates.length; i++) {
               dropDown.append("<option>" + gotDates[i].DATES + "</option>");
           }
    });
}

var gotDates;
var haveDates= false;

function setDates(json){
	gotDates = json;
	haveDates = true;
}

function getMoneyInDateRange() {
    alert("What do the params for this mean?: function doSumJackpotQuery(winDate, tableName, callback) (I know I could look at query.php and figure it out but it's late so I'm going to bed so i'd appreciate a text with the answer) Also we're [me/hogan/pay$/NG] are going to metro @2 if you wanna come");
}
