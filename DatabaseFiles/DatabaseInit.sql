drop table Jackpots;
drop table Numbers;

create table Jackpots (
    theDate date,
    systemNumber int,
    jackpotAmount int,
    alternateJackpotAmount int
);

create table Numbers (
	drawingDate date,
    lottoNumber int,
    numberType int,
    systemNumber int 
);
