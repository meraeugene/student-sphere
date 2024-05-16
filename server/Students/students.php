<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Fetch users from the database excluding the password field
$stmt = $conn->prepare("SELECT student_id, first_name, last_name,  gender, email, date_of_birth, address, phone_number, department_name FROM students");
$stmt->execute();
$result = $stmt->get_result();
$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

// Return users as JSON
echo json_encode($students);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
