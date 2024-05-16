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

// Check if admin username is provided
if (!isset($_POST["username"])) {
    http_response_code(400); 
    echo json_encode(["error" => "Admin Username is not provided"]);
    exit;
}

// Get admin ID from POST data
$adminUsername = sanitize_input($_POST["username"]);

// Prepare and bind statement to delete admin
$stmt = $conn->prepare("DELETE FROM admins WHERE username = ?");
$stmt->bind_param("s", $adminUsername);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Admin deleted successfully"]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error deleting admin: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
