<?php
$dbservername = "localhost";
$dbusername = "username";
$dbpassword = "password";
$dbname = "databasename";

// Create connection
$conn = new mysqli($dbservername, $dbusername, $dbpassword,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>