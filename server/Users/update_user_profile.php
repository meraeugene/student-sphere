<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
$user_id = sanitize_input($_POST["user_id"]);
$first_name = sanitize_input($_POST["firstName"]);
$last_name = sanitize_input($_POST["lastName"]);
$email = sanitize_input($_POST["email"]);
$phone_number = sanitize_input($_POST["phoneNumber"]);
$date_of_birth = sanitize_input($_POST["birthday"]);
$address = sanitize_input($_POST["address"]);

// Handle file upload
$profile_picture = null;
if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] == UPLOAD_ERR_OK) {
    $upload_dir = '../../client/public/uploads/profile_pictures/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    $file_name = basename($_FILES['profilePicture']['name']);
    $target_file = $upload_dir . $file_name;
    if (move_uploaded_file($_FILES['profilePicture']['tmp_name'], $target_file)) {
        $profile_picture = '/uploads/profile_pictures/' . $file_name; // Save the relative path
    }
} else {
    // If no file is uploaded, set the default profile picture URL
    $profile_picture = 'https://raw.githubusercontent.com/meraeugene/student-sphere/main/client/public/images/profile.png';
}

// Prepare and execute statement to update user profile in the database
$sql = "
    UPDATE user_info 
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, profile_picture = ?
    WHERE user_id = ?
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}

$stmt->bind_param("sssssssi", $first_name, $last_name, $email, $phone_number, $date_of_birth, $address, $profile_picture, $user_id);

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
