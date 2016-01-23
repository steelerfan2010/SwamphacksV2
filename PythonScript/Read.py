from sys import argv

script, filename = argv

txt = open(filename)

def convertFormat(oldDate): #given: 01/12/2016  -- returns 2016-01-12
	part = oldDate.split('/')
	newPart = part[2] + '-' + part[0] + '-' + part[1]
	return newPart
	
with open(filename) as f:
     for line in f:
	 eachLine = line.split()

	 eachLine[0] = convertFormat(eachLine[0])

	 count = 1

	 print "\n"

	 while(count < 6):
		print "INSERT INTO RegularNumbers (theDate, regularNumber) VALUES ('" + eachLine[0] + "', " + eachLine[count] + ");"
#	 	print eachLine[0] + ' ' + eachLine[count]
		count = count + 1

#	 print "______________________"
#	 print "POWERBALL #"
#	 print eachLine[0] + ' ' + eachLine[6]
#	 print "______________________"
#	 try:
#	 	print "MULTIPLIER"
#	 	print eachLine[0] + ' ' + eachLine[7]
#	 	print "______________________"
#	 except IndexError:
#		pass


