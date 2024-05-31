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
    return htmlspecialchars(stripslashes(trim($data)));
}

// Log the $_POST array
error_log("Received POST data: " . print_r($_POST, true));

// Get form data
$username = sanitize_input($_POST["username"]);

// Set the password to be the same as the username
$password = $username;

// Determine the role based on the username
$role = "";
switch ($username[4]) {
    case "1":
        $role = "admin"; // ADMIN
        break;
    case "2":
        $role = "faculty"; // FACULTY MEMBER
        break;
    case "3":
        $role = "student"; // STUDENT
        break;
    default:
        $role = "N/A"; // Unknown role
        break;
}

$first_name = sanitize_input($_POST["firstName"]);
$last_name = sanitize_input($_POST["lastName"]);
$email = sanitize_input($_POST["email"]);
$phone_number = sanitize_input($_POST["phoneNumber"]);
$gender = sanitize_input($_POST["gender"]);
$date_of_birth = sanitize_input($_POST["birthday"]);
$address = sanitize_input($_POST["address"]);

// Ensure these fields are either set or NULL
$departmentId = isset($_POST["departmentId"]) ? sanitize_input($_POST["departmentId"]) : NULL;
$programId = isset($_POST["programId"]) ? sanitize_input($_POST["programId"]) : NULL;
$sectionId = isset($_POST["sectionId"]) ? sanitize_input($_POST["sectionId"]) : NULL;
$year_level = isset($_POST["year_level"]) ? sanitize_input($_POST["year_level"]) : NULL;
$semester = isset($_POST["semester"]) ? sanitize_input($_POST["semester"]) : NULL;

// Check if username already exists
$stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Username already exists
    http_response_code(401); // Internal Server Error
    echo json_encode(["error" => "Username already exists"]);
    $stmt->close();
    $conn->close();
    exit();
}

// Insert user into users table
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("sss", $username, $hashed_password, $role);
if (!$stmt->execute()) {
    die("Error: " . $stmt->error); // Output the error message
}
$user_id = $stmt->insert_id;
$stmt->close();

// Insert user info into user_info table
$stmt = $conn->prepare("INSERT INTO user_info (user_id, first_name, last_name, email, phone_number, gender, date_of_birth, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("isssssss", $user_id, $first_name, $last_name, $email, $phone_number, $gender, $date_of_birth, $address);
if (!$stmt->execute()) {
    die("Error: " . $stmt->error); // Output the error message
}

// Insert user into the appropriate table based on the role
switch ($role) {
    case "faculty":
        // Insert faculty into faculties table
        $stmt = $conn->prepare("INSERT INTO faculties (user_id, department_id, program_id) VALUES (?, ?, ?)");
        if (!$stmt) {
            die("Error: " . $conn->error); // Output the error message
        }
        $stmt->bind_param("iii", $user_id, $departmentId, $programId);
        break;
    case "student":
        // Insert student into students table
        $stmt = $conn->prepare("INSERT INTO students (user_id, section_id, department_id, program_id, year_level, semester) VALUES (?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            die("Error: " . $conn->error); // Output the error message
        }
        // Bind parameters for student table
        $stmt->bind_param("iiiiss", $user_id, $sectionId, $departmentId, $programId, $year_level, $semester);
        break;
    default:
        // Unexpected role, handle error
        die("Error: Unexpected role");
}

// Execute the query
if (!$stmt->execute()) {
    die("Error: " . $stmt->error); // Output the error message
}
$stmt->close();

echo json_encode(["message" => "Registration successful"]);

// Close connection
$conn->close();
?>
