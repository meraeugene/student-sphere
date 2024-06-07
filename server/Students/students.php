<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php";

// SQL query to fetch student details along with enrolled subjects
$sql = "
    SELECT 
        s.student_id, s.enrollment_status, s.year_level, s.semester,  
        ui.first_name, ui.last_name, ui.gender, ui.email, ui.profile_picture,
        ui.date_of_birth, ui.address, ui.phone_number,  
        d.department_id, d.department_name, 
        p.program_name, p.program_id, 
        ss.section_name, ss.section_id,
        u.username,
        sub.subject_code
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
        faculty_subjects fs ON ss.section_id = fs.section_id
    LEFT JOIN 
        subjects sub ON fs.subject_code = sub.subject_code
    WHERE 
        u.role = 'student'
    ORDER BY 
        ui.first_name ASC, sub.subject_code ASC
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
    $studentId = $row['student_id'];
    if (!isset($students[$studentId])) {
        // Initialize student details if not already set
        $students[$studentId] = [
            'student_id' => $row['student_id'],
            'enrollment_status' => $row['enrollment_status'],
            'year_level' => $row['year_level'],
            'semester' => $row['semester'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'gender' => $row['gender'],
            'email' => $row['email'],
            'profile_picture' => $row['profile_picture'],
            'date_of_birth' => $row['date_of_birth'],
            'address' => $row['address'],
            'phone_number' => $row['phone_number'],
            'department_id' => $row['department_id'],
            'department_name' => $row['department_name'],
            'program_name' => $row['program_name'],
            'program_id' => $row['program_id'],
            'section_name' => $row['section_name'],
            'section_id' => $row['section_id'],
            'username' => $row['username'],
            'subjects' => []
        ];
    }
    
    // Add subject code to the student's subjects array
    if ($row['subject_code']) {
        $students[$studentId]['subjects'][] = $row['subject_code'];
    }
}

// Return students as JSON
echo json_encode(array_values($students)); // array_values to reindex the array

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
