<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// Fetch users from the database excluding the password field
$sql = "
    SELECT 
        f.faculty_id, f.first_name, f.last_name, f.email, f.phone_number, 
        f.gender, f.date_of_birth, f.address, d.department_name, d.department_id, 
        p.program_name, p.program_id  
    FROM 
        faculties f
    JOIN 
        departments d ON f.department_id = d.department_id
    JOIN 
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

$stmt->execute();
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
