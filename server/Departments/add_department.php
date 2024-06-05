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
$department_name = sanitize_input($_POST["departmentName"]);
$department_head = sanitize_input($_POST["departmentHead"]);
$department_location = sanitize_input($_POST["departmentLocation"]);

// Check if department name already exists
$stmt = $conn->prepare("SELECT department_id FROM departments WHERE department_name = ?");
if (!$stmt) {
    die(json_encode(["error" => "Error: " . $conn->error])); // Output the error message
}
$stmt->bind_param("s", $department_name);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Department name already exists
    echo json_encode(["error" => "Department name already exists"]);
    $stmt->close();
    $conn->close();
    exit();
}

// Insert department into departments table
$stmt = $conn->prepare("INSERT INTO departments (department_name, department_head, department_location) VALUES (?, ?, ?)");
if (!$stmt) {
    die(json_encode(["error" => "Error: " . $conn->error])); // Output the error message
}
$stmt->bind_param("sss", $department_name, $department_head, $department_location);
if (!$stmt->execute()) {
    die(json_encode(["error" => "Error: " . $stmt->error])); // Output the error message
}

echo json_encode(["message" => "Department added successfully"]);

// Close statement and connection
$stmt->close();
$conn->close();
?>
