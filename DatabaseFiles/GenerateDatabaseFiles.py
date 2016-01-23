from sys import argv

script, filename = argv

txt = open(filename)

def convertFormat(oldDate): #given: 01/12/2016  -- returns 2016-01-12
	part = oldDate.split('/')
	newPart = part[2] + '-' + part[0] + '-' + part[1]
	return newPart

target1 = open("InsertRegularNumbers.sql", 'w')
target1.truncate()

target2 = open("InsertPowerballNumbers.sql", 'w')
target2.truncate()

target3 = open("InsertMultiplers.sql", 'w')
target3.truncate()
	
with open(filename) as f:
     for line in f:
	 eachLine = line.split()

	 eachLine[0] = convertFormat(eachLine[0])

	 count = 1

	 target1.write("\n")

	 while(count < 6):
		target1.write("INSERT INTO RegularNumbers (theDate, regularNumber) VALUES ('" + eachLine[0] + "', " + eachLine[count] + ");")
		target1.write("\n")
		count = count + 1

	 target2.write("INSERT INTO PowerballNumbers (theDate, powerballNumber) VALUES ('" + eachLine[0] + "', " + eachLine[6] + ");")
	 target2.write("\n")

	 try:
		target3.write("INSERT INTO Multiplier (theDate, multiplier) VALUES ('" + eachLine[0] + "', " + eachLine[7] + ");")
		target3.write("\n")
	 except IndexError:
		pass


target1.close()
target2.close()
target3.close()
