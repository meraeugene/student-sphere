<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// SQL query to fetch departments with the total number of students and faculty members
$sql = "
    SELECT 
        d.department_id,
        d.department_name, 
        d.department_head, 
        d.department_location,
        COALESCE(student_counts.total_students, 0) AS total_students,
        COALESCE(faculty_counts.total_faculty, 0) AS total_faculty
    FROM 
        departments d
    LEFT JOIN (
        SELECT 
            s.department_id,
            COUNT(DISTINCT s.student_id) AS total_students
        FROM 
            students s
        GROUP BY 
            s.department_id
    ) student_counts ON d.department_id = student_counts.department_id
    LEFT JOIN (
        SELECT 
            f.department_id,
            COUNT(DISTINCT f.faculty_id) AS total_faculty
        FROM 
            faculties f
        GROUP BY 
            f.department_id
    ) faculty_counts ON d.department_id = faculty_counts.department_id
";

// Prepare the SQL statement
$stmt = $conn->prepare($sql);

// Check if the prepare() method was successful
if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement"]);
    error_log("SQL error: " . $conn->error);
    exit;
}

// Execute the SQL statement
if (!$stmt->execute()) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to execute the SQL statement"]);
    error_log("Execution error: " . $stmt->error);
    exit;
}

// Get the result
$result = $stmt->get_result();
$departments = [];

// Fetch the departments and store them in an array
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
