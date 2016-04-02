drop table Jackpots;
drop table Numbers;
drop table GeneratedTickets;
drop table RandomTickets;
drop table Prizes;

create table Jackpots (
    drawingDate date,
    systemNumber int,
    jackpotAmount int
);

create table Numbers (
	drawingDate date,
    lottoNumber int,
    numberType int,
    systemNumber int 
);

create table GeneratedTickets (
	tid int,
    lottoNumber int,
    numberType int,
    systemNumber int 
);

create table RandomTickets (
	tid int,
    lottoNumber int,
    numberType int,
    systemNumber int 
);

create table Prizes (
	regularMatches int,
	powerballMatches int,
	prize int
);
