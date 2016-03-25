DROP TABLE Systems;
DROP TABLE Numbers;
DROP TABLE NumberAvailability;
DROP TABLE SimulatedTickets;
DROP TABLE SimulatedTicketNumbers;
DROP TABLE Drawings;

CREATE TABLE Systems (
    StartDate DATE,
    EndDate DATE,
    SystemNumber INTEGER,
    Info VARCHAR(255),
    PRIMARY KEY(SystemNumber)
);

CREATE TABLE Drawings (
    DrawingDate DATE,
    SystemNumber INTEGER,
    JackpotAmount NUMERIC(18,2),
    PRIMARY KEY(DrawingDate)
);

CREATE TABLE Numbers (
    DrawingDate DATE,
    Value INTEGER,
    Type VARCHAR(255),
    PRIMARY KEY (DrawingDate, Value, Type),
    FOREIGN KEY (DrawingDate) REFERENCES Drawings(DrawingDate)
);

CREATE TABLE NumberAvailability (
    DrawingDate DATE,
    Value INTEGER,
    Type VARCHAR(255),
    PRIMARY KEY (DrawingDate, Value, Type),
    FOREIGN KEY (DrawingDate) REFERENCES Drawings(DrawingDate)
);


CREATE TABLE SimulatedTickets (
    TicketId INTEGER,
    DrawingDate DATE,
    Algorithm VARCHAR(255),
    Winnings NUMBER(18,2),
    PRIMARY KEY (TicketId)
);

CREATE TABLE SimulatedTicketNumbers (
    TicketId INTEGER,
    Value INTEGER,
    Type VARCHAR(255),
    PRIMARY KEY(TicketId, Value, Type),
	FOREIGN KEY(TicketId) REFERENCES SimulatedTickets(TicketID)
);
