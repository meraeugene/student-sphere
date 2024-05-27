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
$sectionName = sanitize_input($_POST["sectionName"]);
$yearLevel = sanitize_input($_POST["yearLevel"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);

// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO sections (section_name, year_level, department_id, program_id) VALUES (?,?,?,?)");
$stmt->bind_param("ssii", $sectionName, $yearLevel, $departmentId, $programId);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["message" => "Section added Successfully", ]);
} else {
    http_response_code(404); 
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
