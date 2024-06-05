<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php";

// Get facultyId from the request
$facultyId = isset($_GET['facultyId']) ? intval($_GET['facultyId']) : 0;

if ($facultyId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid faculty ID"]);
    exit;
}

// SQL query to fetch student details under the specific faculty's subjects
$sql = "
    SELECT 
        s.student_id, s.enrollment_status, s.year_level, s.semester,  
        ui.first_name, ui.last_name, ui.gender, ui.email, 
        ui.date_of_birth, ui.address, ui.phone_number,  
        d.department_id, d.department_name, 
        p.program_name, p.program_id, 
        ss.section_name, ss.section_id,
        sub.subject_code, sub.subject_name,
        u.username,
        g.midterm_grade, g.final_grade, g.remarks
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
    LEFT JOIN 
        faculty_subjects fs ON s.section_id = fs.section_id 
    LEFT JOIN 
        subjects sub ON fs.subject_code = sub.subject_code 
    LEFT JOIN 
        grades g ON s.student_id = g.student_id AND sub.subject_code = g.subject_code
    WHERE 
        u.role = 'student' AND fs.faculty_id = ?
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

// Bind the faculty ID parameter
$stmt->bind_param("i", $facultyId);

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
$studentIds = [];

// Fetch the students and store them in an array
while ($row = $result->fetch_assoc()) {
    if (!in_array($row['student_id'], $studentIds)) {
        $students[] = $row;
        $studentIds[] = $row['student_id'];
    }
}

// Return students as JSON
echo json_encode($students);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
