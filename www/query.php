#!/usr/local/bin/php

<?php

include_once("credentials.php");

ini_set('display_errors', 'On');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Create connection
$connection = oci_connect($username = CISE_USER,
                          $password = CISE_PASS,
                          $connection_string = '//oracle.cise.ufl.edu/orcl');

//Select which type of query
$sql = "";
switch($_GET["queryType"]){
	case "frequency":
		$sql = getFrequencyQuery($_GET["startDate"], $_GET["endDate"], $_GET["numberType"]);
		break;
	case "dates":
		$sql = getDates();
		break;
	case "datesOfSystem":
		$sql = getDatesOfSystem($_GET["systemNumber"]);
		break;
	case "sumJackpot":
		$sql = getSumJackpot($_GET["winDate"], $_GET["tableName"]);
		break;
	case "bestWinnings":
		$sql = getBestWinnings($_GET["rn1"], $_GET["rn2"], $_GET["rn3"], $_GET["rn4"], $_GET["rn5"], $_GET["pbNum"]);
		break;
	case "frequencyInSystem":
		$sql = getFrequencyInSystem($_GET["startDate"], $_GET["endDate"], $_GET["numberType"], $_GET["systemNumber"]);
		break;
	case "jackpotPerYear":
		$sql = getJackpotPerYear();
		break;
	case "mostCommonNumbers":
		$sql = getMostCommonNumbers($_GET["numRows"]);
		break;
	case "threeRuns":
		$sql = getThreeRuns($_GET["numRows"]);
		break;
	case "fourRuns":
		$sql = getFourRuns();
		break;
	case "pairs":
		$sql = getPairs($_GET["numRows"]);
		break;
	case "triplets":
		$sql = getTriplets($_GET["numRows"]);
		break;
	case "percentEvenOdd":
		$sql = getpercentEvenOdd();
		break;
	case "allEvenOrOdd":
		$sql = getAllEvenOrOdd();
		break;
}

//Run statement
$statement = oci_parse($connection, $sql);
oci_execute($statement);

//Statment to JSON.
$rows = array();
while (($row = oci_fetch_object($statement))) {
    $rows[] = $row;
}

//Return JSON.
print json_encode($rows);

//Close connection
oci_free_statement($statement);
oci_close($connection);

//Helpers -----

//This query returns the frequency of numbers between 2 given dates. Ensure that they are from one system.
function getFrequencyQuery($startDate, $endDate, $numberType){
	$sql = "SELECT lottoNumber, COUNT(*) AS frequency 
			FROM Numbers 
			WHERE drawingDate >= TO_DATE('" . $startDate . "','YYYY-MM-DD')
				AND drawingDate <= TO_DATE('" . $endDate . "','YYYY-MM-DD')
				AND numberType = " . $numberType . "
			GROUP BY lottoNumber
			ORDER BY lottoNumber ASC";
	return $sql;
}

function getDates(){
	$sql = "SELECT distinct to_char(drawingDate,'YYYY-MM-DD') as dates FROM numbers
			ORDER BY dates ASC";
	return $sql;
}

function getDatesOfSystem($systemNumber){
	$sql = "SELECT distinct to_char(drawingDate,'YYYY-MM-DD') as drawingDate FROM Numbers
			WHERE systemNumber = " . $systemNumber . "
			ORDER BY drawingDate ASC";
	return $sql;
}

function getSumJackpot($winDate, $tableName){
	$sql = "WITH
			sysTicks AS (
				SELECT * FROM " . $tableName . " rt
				WHERE rt.systemNumber = (
					SELECT distinct systemNumber FROM Numbers
					WHERE drawingDate = TO_DATE('" . $winDate . "','YYYY-MM-DD')
				)
			),
			matches AS (
				SELECT st.tid, st.numberType, st.lottoNumber FROM numbers nums
				JOIN sysTicks st
				ON nums.lottoNumber = st.lottoNumber
					AND nums.numberType = st.numberType
					AND nums.systemNumber = st.systemNumber
				WHERE drawingDate = TO_DATE('" . $winDate . "','YYYY-MM-DD')
			),
			matchReg AS (
				SELECT tid, count(*) AS cntReg FROM matches
				WHERE numberType = 0
				GROUP BY tid
			),
			matchPb AS (
				SELECT tid, count(*) AS cntPb FROM matches
				WHERE numberType = 1
				GROUP BY tid
			),
			totalMatches AS (
				SELECT distinct st.tid, nvl(mr.cntreg,0) as cntReg, nvl(mpb.cntPb,0) as cntPb FROM sysTicks st
				LEFT JOIN matchReg mr
				ON st.tid = mr.tid
				LEFT JOIN matchPb mpb
				ON st.tid = mpb.tid
			),
			fullTable AS (
				SELECT tid, cntReg, cntPb, prize FROM totalMatches tm
				JOIN Prizes pr
				ON tm.cntReg = pr.regularMatches
				AND tm.cntPb = pr.powerballMatches
				WHERE prize > 0
			)
			SELECT sum(prize) as sum FROM fullTable";
	return $sql;
}

function getBestWinnings($rn1, $rn2, $rn3, $rn4, $rn5, $pbNum){
	$sql = "WITH
			regMat AS (
				SELECT drawingDate, count(drawingDate) as cntReg FROM Numbers
				WHERE numberType = 0
					AND (lottoNumber = " . $rn1 . "
					OR lottoNumber = " . $rn2 . "
					OR lottoNumber = " . $rn3 . "
					OR lottoNumber = " . $rn4 . "
					OR lottoNumber = " . $rn5 . ")
				GROUP BY drawingDate
			),
			pbMat AS (
			 	SELECT drawingDate, count(drawingDate) as cntPb FROM Numbers
				WHERE numberType = 1
					AND lottoNumber = " . $pbNum . "
				GROUP BY drawingDate
			),
			totalDates AS (
				SELECT distinct drawingDate FROM (
					(SELECT drawingDate FROM regMat)
					UNION
					(SELECT drawingDate FROM pbMat)
				)
			),
			matches AS (
				SELECT tm.drawingDate, nvl(cntReg,0) AS cntReg, nvl(cntPb,0) AS cntPb FROM totalDates tm
				LEFT JOIN regMat rm
				ON tm.drawingDate = rm.drawingDate
				LEFT JOIN pbMat pm
				ON pm.drawingDate = rm.drawingDate
			),
			fullTable AS (
				SELECT matches.drawingDate, cntReg, cntPb, prize, nvl(jackpotAmount,10000000) AS jackpotAmount FROM matches
				JOIN prizes pr 
				ON pr.regularMatches = cntReg
					AND pr.powerballMatches = cntPb
				LEFT JOIN Jackpots j
				ON j.drawingDate = matches.drawingDate
			),
			fullWinnings AS (
			SELECT drawingDate, cntReg, cntPb, prize, jackpotAmount,
			CASE
				WHEN cntReg = 5 AND cntPb = 1
					THEN jackpotAmount
					ELSE prize
				END AS winnings
				FROM fullTable
			),
			dateAndWinnings AS (
				SELECT drawingDate, winnings FROM fullWinnings
				WHERE winnings = (
					SELECT MAX(winnings) from fullWinnings
				)
				ORDER BY drawingDate DESC
			)
			SELECT drawingDate, winnings FROM dateAndWinnings
			WHERE drawingDate = (
				SELECT MAX(drawingDate) FROM dateAndWinnings
			)";
	return $sql;
}

function getFrequencyInSystem($startDate, $endDate, $numberType, $systemNumber){
	$sql = "WITH freqsTable AS (
			SELECT lottoNumber, COUNT(*) AS frequency 
			FROM Numbers 
			WHERE drawingDate >= TO_DATE('" . $startDate . "','YYYY-MM-DD')
				AND drawingDate <= TO_DATE('" . $endDate . "','YYYY-MM-DD')
				AND numberType = " . $numberType . "
				AND systemNumber = " . $systemNumber . "
			GROUP BY lottoNumber
			ORDER BY lottoNumber ASC
			),
			numAvaInSys AS (
				SELECT lottoNumber FROM NumbersAvailable
				WHERE systemNumber = " . $systemNumber . "
					AND numberType = " . $numberType . "
			)
			SELECT na.lottoNumber, nvl(frequency,0) AS frequency FROM numAvaInSys na
			LEFT JOIN freqsTable ft
			ON na.lottoNumber = ft.lottoNumber
			ORDER BY lottoNumber ASC";
	return $sql;
}

function getJackpotPerYear(){
	$sql = "WITH jackpotYears AS (
				SELECT distinct EXTRACT(year FROM drawingDate) AS year FROM Jackpots
			),
			jackpotWithYear AS (
				SELECT drawingDate, systemNumber, jackpotAmount, year FROM Jackpots js
				JOIN jackpotYears jy
				ON EXTRACT(year FROM js.drawingDate) = jy.year
			)
			SELECT year, MAX(jackpotAmount) AS jackpotAmount FROM jackpotWithYear
			GROUP BY year
			ORDER BY year ASC";
	return $sql;
}

function getMostCommonNumbers($numRows){
	$sql = "SELECT * FROM (
				SELECT lottoNumber, COUNT(*) AS cnt FROM Numbers
				GROUP BY lottoNumber
				ORDER BY COUNT(*) DESC, lottoNumber ASC
			)
			WHERE rownum <= " . $numRows;
	return $sql;
}

function getThreeRuns($numRows){
	$sql = "SELECT * FROM (
				WITH runs AS (
				SELECT n1.drawingDate, n1.lottoNumber AS ln1, n2.lottoNumber AS ln2, n3.lottoNumber as ln3 FROM Numbers n1
				JOIN Numbers n2 on n1.drawingDate = n2.drawingDate
					AND n2.lottoNumber = n1.lottoNumber + 1
				JOIN Numbers n3 on n1.drawingDate = n3.drawingDate
					AND n3.lottoNumber = n2.lottoNumber + 1
				)
				SELECT ln1 AS lottoNumber1, ln2 AS lottoNumber2, ln3 AS lottoNumber3, COUNT(*) AS frequency FROM runs
				GROUP BY ln1, ln2, ln3
				ORDER BY frequency DESC
			)
			WHERE rownum <= " . $numRows;
	return $sql;
}

function getFourRuns(){
	$sql = "SELECT n1.drawingDate,
			n1.lottoNumber AS lottoNumber1,
			n2.lottoNumber AS lottoNumber2,
			n3.lottoNumber AS lottoNumber3,
			n4.lottoNumber AS lottoNumber4 FROM Numbers n1
			JOIN Numbers n2 ON n1.drawingDate = n2.drawingDate
			  AND n2.lottoNumber = n1.lottoNumber + 1
			JOIN Numbers n3 ON n1.drawingDate = n3.drawingDate
			  AND n3.lottoNumber = n2.lottoNumber + 1
			JOIN Numbers n4 ON n1.drawingDate = n4.drawingDate
			  AND n4.lottoNumber = n3.lottoNumber + 1";
	return $sql;
}

function getPairs($numRows){
	$sql = "SELECT * FROM (
				SELECT n1.lottoNumber AS lottoNumber1, n2.lottoNumber AS lottoNumber2, COUNT(*) AS cnt FROM Numbers n1
				JOIN Numbers n2
				ON n1.drawingDate = n2.drawingDate
					AND n1.lottoNumber < n2.lottoNumber
				GROUP BY n1.lottoNumber, n2.lottoNumber
				ORDER BY COUNT(*) DESC, n1.lottoNumber ASC
			)
			WHERE rownum <= " . $numRows;
	return $sql;
}

function getTriplets($numRows){
	$sql = "SELECT * FROM (
				SELECT n1.lottoNumber AS lottoNumber1, n2.lottoNumber AS lottoNumber2, n3.lottoNumber AS lottoNumber3, COUNT(*) AS cnt FROM Numbers n1
				JOIN Numbers n2
				ON n1.drawingDate = n2.drawingDate
					AND n1.lottoNumber < n2.lottoNumber
				JOIN Numbers n3
				ON n2.drawingDate = n3.drawingDate
					AND n2.lottoNumber < n3.lottoNumber
				GROUP BY n1.lottoNumber, n2.lottoNumber, n3.lottoNumber
				ORDER BY COUNT(*) DESC, n1.lottoNumber ASC, n2.lottoNumber ASC
			)
			WHERE rownum <= " . $numRows;
	return $sql;
}

function getPercentEvenOdd(){
	$sql = "SELECT ROUND(evenno/totalno*100,3) AS percentEven, ROUND(oddno/totalno*100,3) AS percentOdd
			FROM
			(
				SELECT COUNT(*) AS evenno
				FROM Numbers 
				WHERE MOD(lottonumber, 2) = 1 
			),
			(
				SELECT COUNT(*) AS totalno from Numbers
			),
			(
				SELECT COUNT(*) AS oddno
				FROM Numbers 
				WHERE MOD(lottonumber, 2) != 1 
			)";
	return $sql;
}

function getAllEvenOrOdd(){
	$sql = "WITH allOddOrEven AS (
				SELECT drawingDate, oddOrEven, COUNT(*) AS cnt FROM (
					SELECT drawingDate,
					MOD(lottoNumber,2) AS oddOrEven
					FROM Numbers
				)
				GROUP BY drawingDate, oddOrEven
				HAVING COUNT(*) = 6
			)
			SELECT * FROM (
				(SELECT COUNT(*) AS numAllEven FROM allOddOrEven
				WHERE oddOrEven = 0)
				CROSS JOIN
				(SELECT COUNT(*) AS numAllOdd FROM allOddOrEven
				WHERE oddOrEven = 1)
			)";
	return $sql;
}

?>







