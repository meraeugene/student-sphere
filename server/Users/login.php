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

// Log the $_POST array
error_log("Received POST data: " . print_r($_POST, true));

// Get form data
$username = sanitize_input($_POST["username"]);
$password = sanitize_input($_POST["password"]);

// Prepare and execute statement to fetch user from database
$stmt = $conn->prepare("SELECT user_id, username, password, role FROM users WHERE username = ?");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($user_id, $fetched_username, $hashed_password, $role);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    // Check if the password matches the hashed password stored in the database
    if (password_verify($password, $hashed_password)) {
        // Initialize variables for faculty_id and student_id
        $faculty_id = null;
        $student_id = null;

        // Fetch the appropriate ID based on the user's role
        if ($role == 'faculty') {
            $id_stmt = $conn->prepare("SELECT faculty_id FROM faculties WHERE user_id = ?");
            if (!$id_stmt) {
                die("Error: " . $conn->error); // Output the error message
            }
            $id_stmt->bind_param("i", $user_id);
            $id_stmt->execute();
            $id_stmt->bind_result($faculty_id);
            $id_stmt->fetch();
            $id_stmt->close();
        } elseif ($role == 'student') {
            $id_stmt = $conn->prepare("SELECT student_id FROM students WHERE user_id = ?");
            if (!$id_stmt) {
                die("Error: " . $conn->error); // Output the error message
            }
            $id_stmt->bind_param("i", $user_id);
            $id_stmt->execute();
            $id_stmt->bind_result($student_id);
            $id_stmt->fetch();
            $id_stmt->close();
        }

        // Password is correct
        echo json_encode([
            "message" => "Login successful",
            "user_id" => $user_id,
            "role" => $role,
            "faculty_id" => $faculty_id,
            "student_id" => $student_id,
            "redirect_uri" => "/dashboard"
        ]);
    } else {
        // Password is incorrect
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "Invalid username or password"]);
    }
} else {
    // Username not found
    http_response_code(404); // Not found
    echo json_encode(["error" => "Invalid username or password"]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
