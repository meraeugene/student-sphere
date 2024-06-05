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

// Get form data
$studentId = sanitize_input($_POST["studentId"]);
$subjectCode = sanitize_input($_POST["subjectCode"]);
$midtermGrade = !empty($_POST["midtermGrade"]) ? sanitize_input($_POST["midtermGrade"]) : null;
$finalGrade = !empty($_POST["finalGrade"]) ? sanitize_input($_POST["finalGrade"]) : null;
$remarks = !empty($_POST["remarks"]) ? sanitize_input($_POST["remarks"]) : null;

// Validate input data
if (empty($studentId) || empty($subjectCode)) {
    http_response_code(400); 
    echo json_encode(["error" => "Student ID and Subject Code are required."]);
    exit;
}

// Update existing records without inserting new ones
$stmt = $conn->prepare("UPDATE grades SET midterm_grade = COALESCE(?, midterm_grade), final_grade = COALESCE(?, final_grade), remarks = COALESCE(?, remarks) WHERE student_id = ? AND subject_code = ?");
$stmt->bind_param("sssis", $midtermGrade, $finalGrade, $remarks, $studentId, $subjectCode);

if ($stmt->execute()) {
    // Check if any rows were affected by the update operation
    if ($stmt->affected_rows > 0) {
        echo json_encode(["message" => "Grades updated successfully"]);
    } else {
        // No rows were affected, meaning no matching record was found
        http_response_code(404); 
        echo json_encode(["error" => "No matching record found to update."]);
    }
} else {
    http_response_code(500); 
    echo json_encode(["error" => "Error updating grades: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
