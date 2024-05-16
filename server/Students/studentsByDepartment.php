<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set the response content type to JSON
header("Content-Type: application/json");

require_once "../config.php"; 

// SQL query to fetch students and their respective departments
$sql = "
    SELECT 
        d.department_name, 
        s.student_id, 
        s.first_name, 
        s.last_name, 
        s.gender, 
        s.email, 
        s.date_of_birth, 
        s.address, 
        s.phone_number 
    FROM 
        departments d
    LEFT JOIN 
        students s 
    ON 
        d.department_name = s.department_name
    ORDER BY 
        d.department_name, 
        s.last_name, 
        s.first_name";

// Prepare and execute the SQL statement
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

// Initialize an array to store the departments and their students 
$departments = [];

// Fetch and organize the data by department
while ($row = $result->fetch_assoc()) {
    if ($row['student_id'] !== null) { // Check if the faculty member's username is not null
        $departmentName = $row['department_name'];
        $students = [
            'student_id' => $row['student_id'],
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'gender' => $row['gender'],
            'email' => $row['email'],
            'date_of_birth' => $row['date_of_birth'],
            'address' => $row['address'],
            'phone_number' => $row['phone_number'],
        ];

        // Add the student to the appropriate department
        if (!isset($departments[$departmentName])) {
            $departments[$departmentName] = [];
        }
        $departments[$departmentName][] = $students;
    }
}

// Structure the response data
$response = [];
foreach ($departments as $departmentName => $students) {
    $response[] = [
        'department_name' => $departmentName,
        'students' => $students
    ];
}

// Return the response as JSON
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
