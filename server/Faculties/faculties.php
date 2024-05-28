<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Ensure database connection is established
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

// Fetch faculties with their associated sections
$sql = "
    SELECT 
        f.faculty_id, f.first_name, f.last_name, f.email, f.phone_number, 
        f.gender, f.date_of_birth, f.address, d.department_name, d.department_id, 
        p.program_name, p.program_id,
        fs.subject_code,
        fs.school_year,
        GROUP_CONCAT(s.section_name SEPARATOR ', ') AS sections
    FROM 
        faculties f
    LEFT JOIN 
        faculty_subjects fs ON f.faculty_id = fs.faculty_id
    LEFT JOIN 
        sections s ON fs.section_id = s.section_id
    LEFT JOIN 
        subjects sub ON fs.subject_code = sub.subject_code
    LEFT JOIN 
        departments d ON f.department_id = d.department_id
    LEFT JOIN 
        programs p ON f.program_id = p.program_id
    GROUP BY 
        f.faculty_id
    ORDER BY 
        f.first_name ASC
";


$stmt = $conn->prepare($sql);

// Check if the prepare() method was successful
if ($stmt === false) {
    $error = $conn->error;
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement: $error"]);
    error_log("SQL error: $error");
    exit;
}

// Execute the SQL statement
if (!$stmt->execute()) {
    $error = $stmt->error;
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to execute the SQL statement: $error"]);
    error_log("SQL execution error: $error");
    $stmt->close();
    $conn->close();
    exit;
}

// Get the result set
$result = $stmt->get_result();
$faculties = [];

// Fetch the data
while ($row = $result->fetch_assoc()) {
    $faculties[] = $row;
}

// Return faculties with their associated sections as JSON
echo json_encode($faculties);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
