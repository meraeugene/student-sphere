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
$studentId = sanitize_input($_POST["studentId"]);
$firstName = sanitize_input($_POST["firstName"]);
$lastName = sanitize_input($_POST["lastName"]);
$gender = sanitize_input($_POST["gender"]);
$email = sanitize_input($_POST["email"]);
$birthday = sanitize_input($_POST["birthday"]);
$phoneNumber = sanitize_input($_POST["phoneNumber"]);
$address = sanitize_input($_POST["address"]);
$enrollmentStatus = sanitize_input($_POST["enrollmentStatus"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);
$yearLevel = sanitize_input($_POST["yearLevel"]);
$semester = sanitize_input($_POST["semester"]);
$sectionId = sanitize_input($_POST["sectionId"]);

// Check if required fields are provided
if (empty($studentId)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Student ID is required"]);
    exit();
}

 
// Prepare and bind statement
$stmt = $conn->prepare("UPDATE students SET first_name = ?, last_name = ?, email = ?, 
phone_number = ?, gender = ?, date_of_birth = ?, address = ?, enrollment_status = ?, 
year_level = ?, semester = ?, department_id = ?, program_id = ?, section_id = ?
WHERE student_id = ?");
$stmt->bind_param("ssssssssssiiii",  $firstName, $lastName, $email, $phoneNumber, $gender, $birthday, $address, $enrollmentStatus, $yearLevel, $semester, $departmentId, $programId,  $sectionId, $studentId);


// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Student updated Successfully"]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["error" => "Student not found or no changes made"]);
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