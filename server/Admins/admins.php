<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 


// Fetch users from the database excluding the password field
$stmt = $conn->prepare("SELECT username, first_name, last_name,  email, phone_number, gender, date_of_birth  FROM admins");
$stmt->execute();
$result = $stmt->get_result();
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

// Return users as JSON
echo json_encode($users);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
