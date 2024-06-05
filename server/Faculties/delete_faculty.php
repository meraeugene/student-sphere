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

// Log the input data
error_log("Received input data: " . print_r($_POST, true));

// Check if faculty ID is provided
if (!isset($_POST["facultyId"])) {
    http_response_code(400); 
    echo json_encode(["error" => "Faculty ID is not provided"]);
    exit;
}

// Get faculty ID from POST data
$facultyId = sanitize_input($_POST["facultyId"]);

// Fetch the user_id associated with the faculty_id
$stmt = $conn->prepare("SELECT user_id FROM faculties WHERE faculty_id = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Database query preparation failed: " . $conn->error]);
    exit;
}
$stmt->bind_param("i", $facultyId);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    http_response_code(404); // Not Found
    echo json_encode(["error" => "Faculty member not found"]);
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->bind_result($user_id);
$stmt->fetch();
$stmt->close();

// Start a transaction
$conn->begin_transaction();

try {
    // Delete from faculties table
    $stmt = $conn->prepare("DELETE FROM faculties WHERE faculty_id = ?");
    if (!$stmt) {
        throw new Exception("Database query preparation failed: " . $conn->error);
    }
    $stmt->bind_param("i", $facultyId);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute delete query: " . $stmt->error);
    }
    $stmt->close();

    // Delete from user_info table
    $stmt = $conn->prepare("DELETE FROM user_info WHERE user_id = ?");
    if (!$stmt) {
        throw new Exception("Database query preparation failed: " . $conn->error);
    }
    $stmt->bind_param("i", $user_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute delete query: " . $stmt->error);
    }
    $stmt->close();

    // Delete from users table
    $stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
    if (!$stmt) {
        throw new Exception("Database query preparation failed: " . $conn->error);
    }
    $stmt->bind_param("i", $user_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute delete query: " . $stmt->error);
    }
    $stmt->close();

    // Commit the transaction
    $conn->commit();

    echo json_encode(["message" => "Faculty member deleted successfully"]);
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();

    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => $e->getMessage()]);
}

// Close connection
$conn->close();
?>
