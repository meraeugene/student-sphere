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
    return htmlspecialchars(stripslashes(trim($data)));
}

// Log the $_POST array
error_log("Received POST data: " . print_r($_POST, true));

// Check if faculty ID is provided
if (!isset($_POST["facultyId"])) {
    http_response_code(400); 
    echo json_encode(["error" => "Faculty ID is not provided"]);
    exit;
}

// Get faculty ID from POST data
$facultyId = sanitize_input($_POST["facultyId"]);

// Prepare and bind statement to delete faculty section
$sql = "DELETE FROM faculty_subjects WHERE faculty_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    $error = $conn->error;
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement: $error"]);
    error_log("SQL error: $error");
    exit;
}

$stmt->bind_param("i", $facultyId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Faculty member subjects removed successfully"]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Error removing faculty member subjects: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
