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

// Fetch faculties with their associated sections and filter by role "faculty"
$sql = "
    SELECT 
        f.faculty_id,
        ui.first_name, ui.last_name, ui.email, ui.phone_number, 
        ui.gender, ui.date_of_birth, ui.address,
        d.department_name, d.department_id, 
        p.program_name, p.program_id,
        fs.subject_code,
        fs.school_year,
        s.section_name, s.section_id,
        u.username
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
    LEFT JOIN 
        user_info ui ON f.user_id = ui.user_id
    LEFT JOIN 
        users u ON f.user_id = u.user_id
    WHERE 
        u.role = 'faculty'
    ORDER BY 
        ui.first_name ASC
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
    $faculty_id = $row['faculty_id'];
    if (!isset($faculties[$faculty_id])) {
        $faculties[$faculty_id] = [
            'faculty_id' => $row['faculty_id'],
            'username' => $row['username'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'email' => $row['email'],
            'phone_number' => $row['phone_number'],
            'gender' => $row['gender'],
            'date_of_birth' => $row['date_of_birth'],
            'address' => $row['address'],
            'department_name' => $row['department_name'],
            'department_id' => $row['department_id'],
            'program_name' => $row['program_name'],
            'program_id' => $row['program_id'],
            'subject_code' => $row['subject_code'],
            'school_year' => $row['school_year'],
            'sections' => []
        ];
    }
    if (!is_null($row['section_name'])) {
        $section = [
            'section_name' => $row['section_name'],
            'section_id' => $row['section_id'] // Include only section ID
        ];
        if (!in_array($section, $faculties[$faculty_id]['sections'])) {
            $faculties[$faculty_id]['sections'][] = $section;
        }
    }
}

// Reindex the array to remove gaps in keys
$faculties = array_values($faculties);

// Return faculties with their associated sections as JSON
echo json_encode($faculties);

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
