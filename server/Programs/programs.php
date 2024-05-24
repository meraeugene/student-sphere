<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Return the department_name instead of the department_id
$stmt = $conn->prepare("
    SELECT p.program_id, p.program_name, p.school_year , p.semester,  d.department_name , 
    d.department_id
    FROM programs p
    JOIN departments d ON p.department_id = d.department_id
    ORDER BY program_id ASC
");
$stmt->execute();
$result = $stmt->get_result();
$programs = [];
while ($row = $result->fetch_assoc()) {
    $programs[] = $row;
}

echo json_encode($programs);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>