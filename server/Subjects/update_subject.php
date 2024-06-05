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

if (empty($subjectCode)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Subject code is required"]);
    exit();
}

// Prepare and bind statement
$stmt = $conn->prepare("
    UPDATE subjects 
    SET subject_name = ?, status = ? , unit = ?, year_level = ?, semester = ?, department_id = ?, program_id = ?
    WHERE subject_code = ?");
$stmt->bind_param("ssssssss",$subjectName, $status, $unit, $yearLevel, $semester, $departmentId, $programId, $subjectCode);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Subject updated Successfully"]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["error" => "Subject not found or no changes made"]);
    }
} else {
    http_response_code(500); // Internal Server Error
    $error_message = "Error: " . $stmt->error;
    echo json_encode(["error" => $error_message]);

    // To log the error message
    error_log($error_message);
}


// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
