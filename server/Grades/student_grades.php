<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php";

// Function to sanitize user input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get studentId from the request
$studentId = isset($_GET['studentId']) ? intval($_GET['studentId']) : 0;

if ($studentId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid student ID"]);
    exit;
}

// SQL query to fetch student grades based on the subjects they have enrolled
$sql = "
    SELECT 
        sub.subject_code, sub.subject_name, sub.year_level, sub.semester, sub.unit,
        d.department_name, p.program_name, ss.section_name,
        g.grade_id, g.midterm_grade, g.final_grade, g.remarks
    FROM 
        students s
    JOIN 
        sections ss ON s.section_id = ss.section_id
    JOIN 
        programs p ON s.program_id = p.program_id
    JOIN 
        departments d ON s.department_id = d.department_id
    JOIN 
        subjects sub ON sub.program_id = p.program_id 
        AND sub.department_id = d.department_id
        AND sub.year_level = s.year_level
        AND sub.semester = s.semester
    LEFT JOIN 
        grades g ON s.student_id = g.student_id AND sub.subject_code = g.subject_code
    WHERE 
        s.student_id = ?
    ORDER BY 
        sub.subject_name ASC
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

// Bind the student ID parameter
$stmt->bind_param("i", $studentId);

// Execute the statement
if (!$stmt->execute()) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to execute the SQL statement"]);
    error_log("Execution error: " . $stmt->error);
    exit;
}

// Get the result
$result = $stmt->get_result();
$grades = [];

// Fetch the grades and store them in an array
while ($row = $result->fetch_assoc()) {
    $grades[] = $row;
}

// Return grades as JSON
echo json_encode($grades);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
