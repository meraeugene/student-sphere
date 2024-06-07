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

// Get facultyId from the request
$facultyId = isset($_GET['facultyId']) ? intval($_GET['facultyId']) : 0;

if ($facultyId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid faculty ID"]);
    exit;
}

// SQL query to fetch faculty schedule
$sql = "
    SELECT DISTINCT
        s.section_name,
        sub.subject_code,
        sub.subject_name,
        fs.school_year,
        fs.day_of_week,
        fs.time_slot,
        CONCAT(ui.first_name, ' ', ui.last_name) AS teacher,
        ui.email AS faculty_email
    FROM 
        faculty_subjects fs
    JOIN 
        sections s ON fs.section_id = s.section_id
    JOIN 
        subjects sub ON fs.subject_code = sub.subject_code
    JOIN 
        faculties f ON fs.faculty_id = f.faculty_id
    JOIN 
        user_info ui ON f.user_id = ui.user_id
    WHERE 
        fs.faculty_id = ?
    ORDER BY 
        fs.day_of_week, fs.time_slot;
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
$schedule = [];

// Fetch the schedule and store them in an array
while ($row = $result->fetch_assoc()) {
    $schedule[] = $row;
}

// Return schedule as JSON
echo json_encode($schedule);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
