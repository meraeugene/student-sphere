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
$userId = sanitize_input($_POST["user_id"]);
$currentPassword = sanitize_input($_POST["currentPassword"]);
$newPassword = sanitize_input($_POST["newPassword"]);
$confirmPassword = sanitize_input($_POST["confirmPassword"]);

// Check if passwords match
if ($newPassword !== $confirmPassword) {
    http_response_code(404);
    echo json_encode(["error" => "Passwords do not match"]);
    exit;
}

// Check if the username exists
$stmt = $conn->prepare("SELECT * FROM users WHERE user_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows == 0) {
    http_response_code(404);
    echo json_encode(["error" => "User does not exist"]);
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

// Verify if new password is the same as the current password
if (password_verify($newPassword, $user['password'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "New password cannot be the same as the current password"]);
    exit;
}

// Hash the new password for security
$hashed_password = password_hash($newPassword, PASSWORD_DEFAULT);

// Update the password
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE user_id = ?");
$stmt->bind_param("si", $hashed_password, $userId);

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
