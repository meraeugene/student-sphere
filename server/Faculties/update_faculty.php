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
$firstName = sanitize_input($_POST["firstName"]);
$lastName = sanitize_input($_POST["lastName"]);
$gender = sanitize_input($_POST["gender"]);
$email = sanitize_input($_POST["email"]);
$birthday = sanitize_input($_POST["birthday"]);
$address = sanitize_input($_POST["address"]);
$phoneNumber = sanitize_input($_POST["phoneNumber"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);

// Check if the user exists and get their user_id
$stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
if (!$stmt) {
    http_response_code(500);
    die(json_encode(["error" => "Database error: " . $conn->error]));
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user_id);
$stmt->fetch();

if ($stmt->num_rows === 0) {
    http_response_code(404);
    die(json_encode(["error" => "User not found"]));
}

$stmt->close();

// Update the user_info table
$stmt = $conn->prepare("
    UPDATE user_info 
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, date_of_birth = ?, address = ? 
    WHERE user_id = ?");
if (!$stmt) {
    http_response_code(500);
    die(json_encode(["error" => "Database error: " . $conn->error]));
}
$stmt->bind_param("sssssssi", $firstName, $lastName, $email, $phoneNumber, $gender, $birthday, $address, $user_id);
if (!$stmt->execute()) {
    http_response_code(500);
    die(json_encode(["error" => "Error updating user info: " . $stmt->error]));
}
$stmt->close();

// Update the faculties table
$stmt = $conn->prepare("
    UPDATE faculties 
    SET department_id = ?, program_id = ? 
    WHERE user_id = ?");
if (!$stmt) {
    http_response_code(500);
    die(json_encode(["error" => "Database error: " . $conn->error]));
}
$stmt->bind_param("iii", $departmentId, $programId, $user_id);
if (!$stmt->execute()) {
    http_response_code(500);
    die(json_encode(["error" => "Error updating faculty details: " . $stmt->error]));
}

$stmt->close();

echo json_encode(["message" => "Faculty details updated successfully"]);

// Close connection
$conn->close();
?>
