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
$stmt = $conn->prepare("SELECT username, password, first_name, last_name, email, phone_number, gender, date_of_birth, faculty_type FROM faculties WHERE username = ?");
if (!$stmt) {
    die("Error: " . $conn->error); // Output the error message
}
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Check if user exists
if ($stmt->num_rows > 0) {
    // Bind result variables
    $stmt->bind_result($username, $hashed_password, $firstName, $lastName, $email, $phone_number, $gender, $date_of_birth, $faculty_type);
    $stmt->fetch();

    // Verify password
    if (password_verify($password, $hashed_password)) {
        // Password is correct
        
         // Return user information
         echo json_encode([
            "message" => "Login successful",
            "firstName" => $firstName,
            "lastName" => $lastName,
            "role" => "faculty",
            "redirect_uri" => "/dashboard"
        ]);
  
    } else {
        // Password is incorrect
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "You have entered an invalid username or password."]);
    }
} else {
    // User not found
    http_response_code(404); // Not found
    echo json_encode(["error" => "You have entered an invalid username or password."]);
}

// Close statement
$stmt->close();

// Close connection
$conn->close();
?>
