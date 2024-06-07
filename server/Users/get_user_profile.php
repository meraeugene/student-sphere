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

// Log the $_GET array
error_log("Received GET data: " . print_r($_GET, true));

// Get user_id from query parameters
$user_id = sanitize_input($_GET["user_id"]);

// Prepare and execute statement to fetch user profile from database
$stmt = $conn->prepare("
    SELECT u.username, u.role, i.first_name, i.last_name, i.email, i.phone_number, i.gender, i.date_of_birth, i.address, i.profile_picture
    FROM users u 
    JOIN user_info i ON u.user_id = i.user_id 
    WHERE u.user_id = ?
");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($username, $role, $first_name, $last_name, $email, $phone_number, $gender, $date_of_birth, $address, $profile_picture);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    // User found, output profile details
    echo json_encode([
        "username" => $username,
        "role" => $role,
        "first_name" => $first_name,
        "last_name" => $last_name,
        "email" => $email,
        "phone_number" => $phone_number,
        "gender" => $gender,
        "date_of_birth" => $date_of_birth,
        "address" => $address,
        "profile_picture" => $profile_picture
    ]);
} else {
    // User not found
    echo json_encode(["error" => "User not found"]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
