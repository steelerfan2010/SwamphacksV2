import datetime

def convertFormat(oldDate): #given: 01/12/2016  -- returns 2016-01-12
    part = oldDate.split('/')
    newPart = part[2] + '-' + part[0] + '-' + part[1]
    return newPart

def convertToMillions(oldMoney): #given $69.00 -- returns 69,000,000 (no commas)
    newMoney = oldMoney.replace(".", "").replace("$", "")
    newMoney = newMoney + "0000"
    return newMoney

def determineSystemNumber(date): #pretty obvious -- if you're not retarded
    part = date.split('/')
    year = 2000 + int(part[2])
    month = int(part[0])
    day = int(part[1])

    fullDate = datetime.date(year, month, day)
    
    if(fullDate <= datetime.date(1997, 11, 1)):
        print fullDate
        return "1"
    elif(fullDate <= datetime.date(2002, 10, 5)):
        return "2"
    elif(fullDate <= datetime.date(2005, 8, 27)):
        return "3"
    elif(fullDate <= datetime.date(2009, 1, 3)):
        return "4"
    elif(fullDate <= datetime.date(2012, 1, 14)):
        return "5"
    elif(fullDate <= datetime.date(2015, 10, 3)):
        return "6"
    else:
        return "7"

target = open("InsertJackpots.sql", 'w')
target.truncate()

with open("jackpot.txt") as f:
    for line in f:
        eachLine = line.split()
        
        systemNumber = determineSystemNumber(eachLine[1])
        date = convertFormat(eachLine[1])
        jackpotAmount = convertToMillions(eachLine[2])

        target.write("INSERT INTO Jackpots (drawingDate, systemNumber, jackpotAmount) VALUES (DATE '" + date + "', " + systemNumber + ", " + jackpotAmount + ");\n")
