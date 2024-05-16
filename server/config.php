<?php
// Database configuration
$servername = "localhost"; // or your server address
$username = "root"; // your MySQL username
$password = ""; // your MySQL password
$database = "db_student_sphere"; // your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
