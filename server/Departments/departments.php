<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Fetch departments from the database along with the total number of students and faculty members
$stmt = $conn->prepare("SELECT 
                        d.department_id,
                        d.department_name, 
                        d.department_head, 
                        d.department_location, 
                        COUNT(DISTINCT s.student_id) AS total_students, 
                        COUNT(DISTINCT f.faculty_id) AS total_faculty
                        FROM departments d
                        LEFT JOIN students s ON d.department_id = s.department_id
                        LEFT JOIN faculties f ON d.department_id = f.department_id
                        GROUP BY d.department_id
                        ");
$stmt->execute();
$result = $stmt->get_result();
$departments = [];
while ($row = $result->fetch_assoc()) {
    $departments[] = $row;
}

// Return departments with total students and faculty members as JSON
echo json_encode($departments);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
