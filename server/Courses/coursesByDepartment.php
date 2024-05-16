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
        c.course_name, 
        c.course_description
    FROM 
        departments d
    LEFT JOIN 
        courses c 
    ON 
        d.department_name = c.department_name
    ORDER BY 
        d.department_name, 
        c.course_name, 
        c.course_description";

// Prepare and execute the SQL statement
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

// Initialize an array to store the departments and their courses
$departments = [];

// Fetch and organize the data by department
while ($row = $result->fetch_assoc()) {
    if ($row['course_name'] !== null) { // Check if the course course id is not null
        $departmentName = $row['department_name'];
        $course = [
            'course_name' => $row['course_name'],
            'course_description' => $row['course_description']
        ];

        // Add the course to the appropriate department
        if (!isset($departments[$departmentName])) {
            $departments[$departmentName] = [];
        }
        $departments[$departmentName][] = $course;
    }
}

// Structure the response data
$response = [];
foreach ($departments as $departmentName => $courses) {
    $response[] = [
        'department_name' => $departmentName,
        'courses' => $courses
    ];
}

// Return the response as JSON
echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
