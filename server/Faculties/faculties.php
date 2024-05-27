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

// Fetch users from the database excluding the password field
$sql = "
    SELECT 
        f.faculty_id, f.first_name, f.last_name, f.email, f.phone_number, 
        f.gender, f.date_of_birth, f.address, s.section_id, s.section_name, sub.subject_code, 
        sub.subject_name, d.department_name, d.department_id, 
        p.program_name, p.program_id 
    FROM 
        faculties f
    LEFT JOIN 
        sections s ON f.section_id = s.section_id
    LEFT JOIN 
        subjects sub ON f.subject_code = sub.subject_code
    LEFT JOIN 
        departments d ON f.department_id = d.department_id
    LEFT JOIN 
        programs p ON f.program_id = p.program_id
    ORDER BY 
        f.first_name ASC
";

$stmt = $conn->prepare($sql);

// Check if the prepare() method was successful
if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement"]);
    error_log("SQL error: " . $conn->error);
    exit;
}

if (!$stmt->execute()) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to execute the SQL statement"]);
    error_log("SQL execution error: " . $stmt->error);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();
$faculties = [];

while ($row = $result->fetch_assoc()) {
    $faculties[] = $row;
}

// Return users as JSON
echo json_encode($faculties);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
