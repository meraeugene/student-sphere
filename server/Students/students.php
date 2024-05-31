<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php";

// SQL query to fetch student details
$sql = "
    SELECT 
        s.student_id, s.enrollment_status, s.year_level, s.semester,  
        ui.first_name, ui.last_name, ui.gender, ui.email, 
        ui.date_of_birth, ui.address, ui.phone_number,  
        d.department_id, d.department_name, 
        p.program_name, p.program_id, 
        ss.section_name, ss.section_id,
        u.username
    FROM 
        students s
    LEFT JOIN 
        departments d ON d.department_id = s.department_id 
    LEFT JOIN 
        programs p ON p.program_id = s.program_id 
    LEFT JOIN 
        sections ss ON ss.section_id = s.section_id 
    LEFT JOIN 
        user_info ui ON ui.user_id = s.user_id 
    LEFT JOIN 
        users u ON u.user_id = s.user_id 
    WHERE 
        u.role = 'student'
    ORDER BY 
        ui.first_name ASC
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

// Execute the statement
if (!$stmt->execute()) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to execute the SQL statement"]);
    error_log("Execution error: " . $stmt->error);
    exit;
}

// Get the result
$result = $stmt->get_result();
$students = [];

// Fetch the students and store them in an array
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

// Return students as JSON
echo json_encode($students);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
