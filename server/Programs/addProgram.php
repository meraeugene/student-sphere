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
$programName = sanitize_input($_POST["programName"]);
$schoolYear = sanitize_input($_POST["schoolYear"]);
$departmentId = sanitize_input($_POST["departmentId"]);

// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO programs (program_name, school_year, department_id) VALUES (?,?,?)");
$stmt->bind_param("ssi", $programName, $schoolYear, $departmentId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Program added successfully", ]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
