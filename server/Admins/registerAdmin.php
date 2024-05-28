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
$firstName = sanitize_input($_POST["firstName"]);
$lastName = sanitize_input($_POST["lastName"]);
$gender = sanitize_input($_POST["gender"]);
$email = sanitize_input($_POST["email"]);
$birthday = sanitize_input($_POST["birthday"]);
$username = sanitize_input($_POST["username"]);
$phoneNumber = sanitize_input($_POST["phoneNumber"]);
$password = sanitize_input($_POST["password"]);
$confirmPassword = sanitize_input($_POST["confirmPassword"]);

// Check if passwords match
if ($password !== $confirmPassword) {
    http_response_code(404); 
    echo json_encode(["error" => "Passwords do not match"]);
    exit;
}

// Hash the password for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if username already exists
$stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    http_response_code(404); 
    echo json_encode(["error" => "Username already exists"]);
    exit;
}
$stmt->close();


// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO admins (username, password, first_name, last_name, email,   phone_number, gender, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?,?)");
$stmt->bind_param("ssssssss", $username, $hashed_password, $firstName, $lastName, $email,  $phoneNumber,  $gender, $birthday);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Registration successful", "redirect_uri" => "/"]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
