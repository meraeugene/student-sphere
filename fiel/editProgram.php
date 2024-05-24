<?php
//edit
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
$programId = sanitize_input($_POST["programId"]);
$programName = sanitize_input($_POST["programName"]);
$schoolYear = sanitize_input($_POST["schoolYear"]);
$semester = sanitize_input($_POST["semester"]);
$departmentId = sanitize_input($_POST["departmentId"]);

if (empty($programName)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Program name is required"]);
    exit();
}

// Prepare and bind statement
$stmt = $conn->prepare("
    UPDATE programs 
    SET program_name = ? , school_year = ?, semester = ? , department_id = ? 
    WHERE program_id = ?");
$stmt->bind_param("ssssi", $programName, $schoolYear, $semester, $departmentId, $programId);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Program updated Successfully"]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["error" => "Program not found or no changes made"]);
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