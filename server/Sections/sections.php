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
    SELECT s.section_id, s.section_name, s.year_level ,  d.department_name , 
           d.department_id,p.program_id, p.program_name 
    FROM sections s
    JOIN departments d ON d.department_id = s.department_id
    JOIN programs p ON p.program_id = s.program_id
    ORDER BY section_name ASC
");
$stmt->execute();
$result = $stmt->get_result();
$sections = [];
while ($row = $result->fetch_assoc()) {
    $sections[] = $row;
}

echo json_encode($sections);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>