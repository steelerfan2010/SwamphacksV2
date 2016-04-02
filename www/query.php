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
	case "sumJackpot":
		$sql = getSumJackpot($_GET["winDate"], $_GET["tableName"]);
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

?>
