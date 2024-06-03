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

// Get the POST data
$post_data = json_decode(file_get_contents("php://input"), true);

if (!isset($post_data["user_id"])) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

$user_id = sanitize_input($post_data["user_id"]);
$first_name = sanitize_input($post_data["firstName"]);
$last_name = sanitize_input($post_data["lastName"]);
$email = sanitize_input($post_data["email"]);
$phone_number = sanitize_input($post_data["phoneNumber"]);
$date_of_birth = sanitize_input($post_data["birthday"]);
$address = sanitize_input($post_data["address"]);

// Prepare and execute statement to update user profile in the database
$stmt = $conn->prepare("
    UPDATE user_info 
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ? 
    WHERE user_id = ?
");

if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}

$stmt->bind_param("ssssssi", $first_name, $last_name, $email, $phone_number, $date_of_birth, $address, $user_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Profile updated successfully"]);
} else {
    echo json_encode(["error" => "Failed to update profile: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
