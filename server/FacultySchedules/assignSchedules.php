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

// Log the $_POST array
error_log("Received POST data: " . print_r($_POST, true));

// Get input data
$facultyId = sanitize_input($_POST["facultyId"]);
$sectionId = sanitize_input($_POST["sectionId"]);
$subjectCode = sanitize_input($_POST["subjectCode"]);
$schoolYear = sanitize_input($_POST["schoolYear"]);
$dayOfWeek = sanitize_input($_POST["day"]);
$timeSlot = sanitize_input($_POST["timeSlot"]);

// Validate input data
if (empty($facultyId) || empty($sectionId) || empty($subjectCode) || empty($schoolYear) || empty($dayOfWeek) || empty($timeSlot)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

// Ensure database connection is established
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

// Update faculty_schedules table
try {
    // Check if the schedule already exists for the faculty in the specified section
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM faculty_schedules WHERE faculty_id = ? AND section_id = ? AND day_of_week = ? AND time_slot = ?");
    $checkStmt->bind_param("iiss", $facultyId, $sectionId, $dayOfWeek, $timeSlot);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        throw new Exception("Schedule already exists for the faculty in the specified section.");
    }

    // Insert the new schedule
    $stmt = $conn->prepare("INSERT INTO faculty_schedules (faculty_id, section_id, subject_code, school_year, day_of_week, time_slot) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iissss", $facultyId, $sectionId, $subjectCode, $schoolYear, $dayOfWeek, $timeSlot);
    if (!$stmt->execute()) {
        throw new Exception("Failed to assign schedule.");
    }
    $stmt->close();

    echo json_encode(["message" => "Schedule assigned successfully"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
