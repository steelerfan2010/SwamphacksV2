def genInsertAvailable(sysNum, num, numType):
	return "INSERT INTO NumbersAvailable (systemNumber, lottoNumber, numberType) VALUES (" + str(sysNum) + "," + str(num) + "," + str(numType) + ");\n"

def genSysAva(sysNum, maxReg, maxPb):
	sysAva = "";
	for i in range(1,maxReg+1):
		sysAva = sysAva + genInsertAvailable(sysNum, i, 0);
	for i in range(1,maxPb+1):
		sysAva = sysAva + genInsertAvailable(sysNum, i, 1);
	sysAva = sysAva + "\n"
	return sysAva

target = open("InsertNumbersAvailable.sql", 'w')
target.truncate()

target.write(genSysAva(1,45,45));
target.write(genSysAva(2,49,42));
target.write(genSysAva(3,53,42));
target.write(genSysAva(4,55,42));
target.write(genSysAva(5,59,39));
target.write(genSysAva(6,59,35));
target.write(genSysAva(7,69,26));

target.close()
