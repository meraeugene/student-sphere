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

// Check if student ID is provided
if (!isset($_POST["studentId"])) {
    http_response_code(400); 
    echo json_encode(["error" => "Student ID is not provided"]);
    exit;
}

// Get student ID from POST data
$studentId = sanitize_input($_POST["studentId"]);

// Prepare and bind statement to delete admin
$stmt = $conn->prepare("DELETE FROM students WHERE student_id = ?");
$stmt->bind_param("s", $studentId );

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Student deleted successfully"]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error deleting faculty student: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
