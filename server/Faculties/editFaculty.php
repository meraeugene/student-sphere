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
$facultyId = sanitize_input($_POST["facultyId"]);
$firstName = sanitize_input($_POST["firstName"]);
$lastName = sanitize_input($_POST["lastName"]);
$gender = sanitize_input($_POST["gender"]);
$email = sanitize_input($_POST["email"]);
$birthday = sanitize_input($_POST["birthday"]);
$address = sanitize_input($_POST["address"]);
$phoneNumber = sanitize_input($_POST["phoneNumber"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);

// Prepare and bind the update statement
$stmt = $conn->prepare("
    UPDATE faculties 
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?, gender = ?, date_of_birth = ?, address = ?, department_id = ?, program_id = ? 
    WHERE faculty_id = ?");
$stmt->bind_param("sssssssssi", $firstName, $lastName, $email, $phoneNumber, $gender, $birthday, $address, $departmentId, $programId, $facultyId);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Faculty details updated successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Faculty ID not found"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
