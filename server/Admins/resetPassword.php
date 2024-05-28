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
$username = sanitize_input($_POST["username"]);
$currentPassword = sanitize_input($_POST["currentPassword"]);
$newPassword = sanitize_input($_POST["newPassword"]);
$confirmPassword = sanitize_input($_POST["confirmPassword"]);

// Check if passwords match
if ($newPassword !== $confirmPassword) {
    http_response_code(404);
    echo json_encode(["error" => "Password do not match"]);
    exit;
}

// Check if the username exists
$stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows == 0) {
    http_response_code(404);
    echo json_encode(["error" => "Username does not exist"]);
    exit;
}
$user = $result->fetch_assoc();
$stmt->close();

// Verify old password
if (!password_verify($currentPassword, $user['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Current password does not match"]);
    exit;
}

// Hash the new password for security
$hashed_password = password_hash($newPassword, PASSWORD_DEFAULT);

// Update the password
$stmt = $conn->prepare("UPDATE admins SET password = ? WHERE username = ?");
$stmt->bind_param("ss", $hashed_password, $username);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Password reset successful"]);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
