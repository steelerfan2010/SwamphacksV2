import datetime

def convertFormat(oldDate): #given: 01/12/2016  -- returns 2016-01-12
	part = oldDate.split('/')
	newPart = part[2] + '-' + part[0] + '-' + part[1]
	return newPart

def determineSystemNumber(date): #pretty obvious -- if you're not retarded
    part = date.split('/')
    year = int(part[2])
    month = int(part[0])
    day = int(part[1])

    fullDate = datetime.date(year, month, day)

    if(fullDate <= datetime.date(1997, 11, 1)):
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

target = open("InsertNumbers.sql", 'w')
target.truncate()

with open("Powerballs.txt") as f:
     for line in f:
	 eachLine = line.split()

         systemNumber = determineSystemNumber(eachLine[0])
	 eachLine[0] = convertFormat(eachLine[0])

	 count = 1

	 while(count < 7):
            if(count == 6): #numberType == 1 for Powerballs
		target.write("INSERT INTO Numbers (drawingDate, lottoNumber, numberType, systemNumber) VALUES (DATE '" + eachLine[0] + "', " + eachLine[count] + ", 1, " + systemNumber + ");\n")
            else: #regular numbers
		target.write("INSERT INTO Numbers (drawingDate, lottoNumber, numberType, systemNumber) VALUES (DATE '" + eachLine[0] + "', " + eachLine[count] + ", 0, " + systemNumber + ");\n")


	    count = count + 1

target.close()
