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

if (empty($subjectCode)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Subject code is required"]);
    exit();
}

// Prepare and bind statement
$stmt = $conn->prepare("DELETE FROM subjects WHERE subject_code = ?");
$stmt->bind_param("s", $subjectCode);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Subject deleted Successfully"]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["error" => "Subject not found"]);
    }
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>