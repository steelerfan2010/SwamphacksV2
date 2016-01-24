<?php

//ini_set('display_errors', 'On');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "Pizza1";
$dbname = "SwampHacks";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "";
switch($_GET["numberType"]){
	case "regular":
		$sql = $sql = "SELECT regularNumber, COUNT(*) AS frequency FROM RegularNumbers WHERE theDate >= '2015-09-07' GROUP BY regularNumber";
		break;
	case "powerball":
		$sql = "SELECT powerballNumber, COUNT(*) AS frequency FROM PowerballNumbers WHERE theDate >= '2015-09-07' GROUP BY powerballNumber";
		break;
}

$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		//echo "Number: ", $row["regularNumber"], " ";
		$rows[] = $row;
    }
    print json_encode($rows);
} else {
    echo "0 results";
}

$conn->close();

?>
