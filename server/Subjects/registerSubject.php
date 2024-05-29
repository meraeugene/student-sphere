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

// Get form data
$subjectCode = sanitize_input($_POST["subjectCode"]);
$subjectName = sanitize_input($_POST["subjectName"]);
$status = sanitize_input($_POST["status"]);
$unit = sanitize_input($_POST["unit"]);
$yearLevel = sanitize_input($_POST["yearLevel"]);
$semester = sanitize_input($_POST["semester"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);

// Check if subjectCode is unique
$checkStmt = $conn->prepare("SELECT COUNT(*) FROM subjects WHERE subject_code = ?");
$checkStmt->bind_param("s", $subjectCode);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    http_response_code(409); // Conflict
    echo json_encode(["error" => "Subject code already exists"]);
} else {
    // Prepare and bind statement
    $stmt = $conn->prepare("INSERT INTO subjects (subject_code, subject_name, status, unit, year_level, semester, department_id, program_id) VALUES (?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssii", $subjectCode, $subjectName, $status, $unit, $yearLevel, $semester, $departmentId, $programId);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Subject added successfully"]);
    } else {
        http_response_code(500); 
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
