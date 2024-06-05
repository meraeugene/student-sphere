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
$sectionid = sanitize_input($_POST["sectionId"]);
$sectionName = sanitize_input($_POST["sectionName"]);
$yearLevel = sanitize_input($_POST["yearLevel"]);
$departmentId = sanitize_input($_POST["departmentId"]);
$programId = sanitize_input($_POST["programId"]);

if (empty($sectionid)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Section ID is required"]);
    exit();
}

// Prepare and bind statement
$stmt = $conn->prepare("
    UPDATE sections 
    SET section_name = ? , year_level = ?, department_id = ? , program_id = ? 
    WHERE section_id = ?");
$stmt->bind_param("sssii", $sectionName, $yearLevel, $departmentId, $programId, $sectionid);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Section updated successfully"]);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["error" => "Section not found or no changes made"]);
    }
} else {
    http_response_code(500); // Internal Server Error
    $error_message = "Error: " . $stmt->error;
    echo json_encode(["error" => $error_message]);

    // To log the error message
    error_log($error_message);
}


// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
