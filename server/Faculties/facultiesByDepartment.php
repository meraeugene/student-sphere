<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// SQL query to fetch faculty members and their respective departments
$sql = "
    SELECT 
        d.department_name, 
        f.username, 
        f.first_name, 
        f.last_name, 
        f.email, 
        f.phone_number, 
        f.gender, 
        f.date_of_birth, 
        f.faculty_type 
    FROM 
        departments d
    LEFT JOIN 
        faculties f 
    ON 
        d.department_name = f.department_name
    ORDER BY 
        d.department_name, 
        f.last_name, 
        f.first_name";

// Prepare and execute the SQL statement
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

// Initialize an array to store the departments and their faculty members
$departments = [];

// Fetch and organize the data by department
while ($row = $result->fetch_assoc()) {
    if ($row['username'] !== null) { // Check if the faculty member's username is not null
        $departmentName = $row['department_name'];
        $facultyMember = [
            'username' => $row['username'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'email' => $row['email'],
            'phone_number' => $row['phone_number'],
            'gender' => $row['gender'],
            'date_of_birth' => $row['date_of_birth'],
            'faculty_type' => $row['faculty_type']
        ];

        // Add the faculty member to the appropriate department
        if (!isset($departments[$departmentName])) {
            $departments[$departmentName] = [];
        }
        $departments[$departmentName][] = $facultyMember;
    }
}

// Structure the response data
$response = [];
foreach ($departments as $departmentName => $facultyMembers) {
    $response[] = [
        'department_name' => $departmentName,
        'faculty_members' => $facultyMembers
    ];
}

// Return the response as JSON
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
