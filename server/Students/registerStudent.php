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
$studentID = sanitize_input($_POST["studentId"]);
$firstName = sanitize_input($_POST["firstName"]);
$lastName = sanitize_input($_POST["lastName"]);
$gender = sanitize_input($_POST["gender"]);
$email = sanitize_input($_POST["email"]);
$birthday = sanitize_input($_POST["birthday"]);
$address = sanitize_input($_POST["address"]);
$phoneNumber = sanitize_input($_POST["phoneNumber"]);
$departmentId = sanitize_input($_POST["departmentId"]);

// Set password to be the same as studentID
$hashed_password = password_hash($studentID, PASSWORD_DEFAULT);

// Check if student ID already exists in students table
$stmt = $conn->prepare("SELECT * FROM students WHERE student_id = ?");
$stmt->bind_param("i", $studentID);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    http_response_code(404); 
    echo json_encode(["error" => "Student account already exists"]);
    exit;
}
$stmt->close();

// Check if student ID already exists in faculties table
$stmt = $conn->prepare("SELECT * FROM faculties WHERE faculty_id = ?");
$stmt->bind_param("i", $studentID);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    http_response_code(404); 
    echo json_encode(["error" => "ID already used as a Faculty ID"]);
    exit;
}
$stmt->close();

// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO students (student_id, password, first_name, last_name, gender, email, date_of_birth, address, phone_number, department_id) VALUES (?,?,?,?,?,?,?,?,?,?)");
$stmt->bind_param("sssssssssi", $studentID, $hashed_password, $firstName, $lastName, $gender, $email, $birthday, $address, $phoneNumber, $departmentId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Student Registration successful", "redirect_uri" => "/"]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
