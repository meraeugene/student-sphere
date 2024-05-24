<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Allow POST methods
header("Access-Control-Allow-Methods: POST");

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

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get and sanitize form data
    $facultyId = sanitize_input($_POST["facultyId"]);
    $semester = sanitize_input($_POST["semester"]);
    $yearLevel = sanitize_input($_POST["yearLevel"]);
    $schoolYear = sanitize_input($_POST["schoolYear"]);
    $subjectCode = sanitize_input($_POST["subjectCode"]);
    $sectionId = sanitize_input($_POST["sectionId"]);

    // Check if subjectCode and facultyId are provided
    if (empty($facultyId) || empty($subjectCode)) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Faculty ID and Subject Code are required"]);
        exit();
    }

    // Prepare statement to assign the subject to faculty
    $stmt = $conn->prepare("INSERT INTO faculty_subjects (semester, year_level, school_year, subject_code, faculty_id, section_id) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssii", $semester, $yearLevel, $schoolYear, $subjectCode, $facultyId, $sectionId);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Subject assigned successfully"]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    // Close statement
    $stmt->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only POST requests are allowed"]);
}

// Close connection
$conn->close();
?>
