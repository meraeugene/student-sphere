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
$courseName = sanitize_input($_POST["courseName"]);
$courseDesc = sanitize_input($_POST["courseDesc"]);
$departmentName = sanitize_input($_POST["departmentName"]);


// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO courses (course_name, course_description,department_name) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $courseName, $courseDesc, $departmentName);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Course Added Successfully", ]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
