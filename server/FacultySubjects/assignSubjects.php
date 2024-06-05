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
$subjectCode = sanitize_input($_POST["subjectCode"]);
// This is expected to be a comma-separated string
$sectionIdsString = sanitize_input($_POST["sectionIds"]); 
$schoolYear = sanitize_input($_POST["schoolYear"]);
$dayOfWeek = sanitize_input($_POST["dayOfWeek"]);
$timeSlot = sanitize_input($_POST["timeSlot"]);

// Validate input data
if (empty($facultyId) || empty($subjectCode) || empty($sectionIdsString) || empty($schoolYear)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

// Convert comma-separated string of sectionIds to an array
$sectionIds = explode(",", $sectionIdsString);

// Ensure database connection is established
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

// Update faculty_subjects table
$conn->begin_transaction();

try {
    // Check if the subject code is already assigned to another faculty
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM faculty_subjects WHERE subject_code = ? AND faculty_id != ?");
    $checkStmt->bind_param("si", $subjectCode, $facultyId);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        throw new Exception("The subject is already assigned to another faculty.");
    }

    foreach ($sectionIds as $sectionId) {
        $stmt = $conn->prepare("INSERT INTO faculty_subjects (faculty_id, section_id, subject_code, school_year, day_of_week, time_slot) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissss", $facultyId, $sectionId, $subjectCode, $schoolYear, $dayOfWeek, $timeSlot);
        if (!$stmt->execute()) {
            throw new Exception("Failed to assign section. The section might already be assigned, or the day and time are already taken.");
        }
        $stmt->close();
    }
    $conn->commit();
    echo json_encode(["message" => "Subjects assigned successfully"]);
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

$conn->close();
?>
