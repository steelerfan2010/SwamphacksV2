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
/*switch($_GET["numberType"]){
	case "regular":
		$sql = "SELECT regularNumber, COUNT(*) AS frequency 
				FROM RegularNumbers 
				WHERE theDate >= TO_DATE('2015-09-07','YYYY-MM-DD') 
				GROUP BY regularNumber
				ORDER BY regularNumber ASC";
		break;
	case "powerball":
		$sql = "SELECT powerballNumber, COUNT(*) AS frequency 
				FROM PowerballNumbers 
				WHERE theDate >= TO_DATE('2015-09-07','YYYY-MM-DD') 
				GROUP BY powerballNumber
				ORDER BY powerballNumber ASC";
		break;
}*/
switch($_GET["queryType"]){
	case "frequency":
		$sql = getFrequencyQuery($_GET["startDate"], $_GET["endDate"], $_GET["numberType"]);
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
print json_encode($rows);

//Close connection
oci_free_statement($statement);
oci_close($connection);

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

?>
