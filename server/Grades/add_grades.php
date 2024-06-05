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

// Check if the grade for this student and subject already exists
$stmt_check = $conn->prepare("SELECT grade_id, midterm_grade, final_grade, remarks FROM grades WHERE student_id = ? AND subject_code = ?");
$stmt_check->bind_param("is", $studentId, $subjectCode);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    // Grade for this student and subject already exists
    $stmt_check->bind_result($grade_id, $existing_midterm_grade, $existing_final_grade, $existing_remarks);
    $stmt_check->fetch();

    // Check if midterm grade already exists and is provided
    if ($midtermGrade !== null && $existing_midterm_grade !== null) {
        http_response_code(400); 
        echo json_encode(["error" => "Midterm grade already exists for this student."]);
        exit;
    }

    // Check if final grade already exists and is provided
    if ($finalGrade !== null && $existing_final_grade !== null) {
        http_response_code(400);    
        echo json_encode(["error" => "Final grade already exists for this student."]);     
        exit;
    }

    // Check if remarks already exist and are provided
    if ($remarks !== null && $existing_remarks !== null) {
        http_response_code(400); 
        echo json_encode(["error" => "Remarks already exist for this student."]);
        exit;
    }

    
} else {
    // Grade for this student and subject does not exist, insert new record
    $stmt_insert = $conn->prepare("INSERT INTO grades (student_id, subject_code, midterm_grade, final_grade, remarks) VALUES (?, ?, ?, ?, ?)");
    $stmt_insert->bind_param("issss", $studentId, $subjectCode, $midtermGrade, $finalGrade, $remarks);

    if ($stmt_insert->execute()) {
        echo json_encode(["message" => "Grades added successfully"]);
    } else {
        http_response_code(500); 
        echo json_encode(["error" => "Error inserting grades: " . $stmt_insert->error]);
    }

    $stmt_insert->close();
}

$stmt_check->close();
$conn->close();
?>
