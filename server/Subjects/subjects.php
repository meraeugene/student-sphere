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
    SELECT s.subject_code, s.subject_name, s.status ,  s.hours , s.unit, s.year_level, s.semester,
    d.department_name, d.department_id, p.program_name, p.program_id  
    FROM subjects s
    JOIN departments d ON d.department_id = s.department_id
    JOIN programs p ON p.program_id = s.program_id
    ORDER BY subject_name ASC
");
$stmt->execute();
$result = $stmt->get_result();
$subjects = [];
while ($row = $result->fetch_assoc()) {
    $subjects[] = $row;
}

echo json_encode($subjects);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>