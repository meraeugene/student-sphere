<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Fetch users from the database excluding the password field
$sql = "
    SELECT 
        s.student_id, s.first_name, s.last_name, s.gender, s.email, s.date_of_birth, s.address, 
        s.phone_number, d.department_id, d.department_name
    FROM 
        students s
    JOIN 
        departments d ON s.department_id = d.department_id
    ORDER BY 
        s.first_name ASC
";

$stmt = $conn->prepare($sql);

// Check if the prepare() method was successful
if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement"]);
    error_log("SQL error: " . $conn->error);
    exit;
}

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
