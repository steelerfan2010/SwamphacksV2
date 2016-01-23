<?php

ini_set('display_errors', 'On');

$servername = "localhost";
$username = "root";
$password = "Pizza1";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM stuff";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		echo "Name: ", $row["name"], " ";
    }
} else {
    echo "0 results";
}

$conn->close();

?>
