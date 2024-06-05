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

// SQL query to fetch student subjects enrolled
$sql = "
    SELECT 
        sub.subject_code, sub.subject_name, sub.unit,
        ss.section_name,
        CONCAT(fs.day_of_week, ' ', fs.time_slot) AS schedule,
        CONCAT(ui.first_name, ' ', ui.last_name) AS teacher,
        ui.email AS faculty_email
    FROM 
        students s
    JOIN 
        sections ss ON s.section_id = ss.section_id
    JOIN 
        faculty_subjects fs ON ss.section_id = fs.section_id
    JOIN 
        subjects sub ON fs.subject_code = sub.subject_code
    JOIN 
        faculties f ON fs.faculty_id = f.faculty_id
    JOIN 
        user_info ui ON f.user_id = ui.user_id
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
$subjects = [];

// Fetch the subjects and store them in an array
while ($row = $result->fetch_assoc()) {
    $subjects[] = $row;
}

// Return subjects as JSON
echo json_encode($subjects);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
