<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../lasalle-calendar-env-variables/config.php';
session_start();

// Check if the user is logged in and has a user ID
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin'] === true) {
    http_response_code(401); // Unauthorized
    echo json_encode(array("success" => false, "message" => "User not authorized"));
    exit;
}

// Make sure user id is set
if (!isset($_SESSION['id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array("success" => false, "message" => "User not authorized"));
    exit;
}

//error_log("Session logged in: " . json_encode($_SESSION['loggedin']));
// if (isset($_SESSION['id'])) {
//     error_log("Session id: " . json_encode($_SESSION['id']));
// }

$userId = $_SESSION['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $userData = getUserData($userId);

    if ($userData) {
        // Return the user data as a JSON response
        //
        //error_log("User Data: " . json_encode($userData));
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'data' => $userData]);
        exit;
    } else {
        // User data retrieval failed
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Failed to retrieve user data']);
        exit;
    }
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}

function getUserData($userId)
{
    global $db_host, $db_username, $db_password, $db_database;
    try {
        // Perform database connection
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
        // Check connection
        if ($conn->connect_error) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Database connection error"));
            die("Connection failed: " . $conn->connect_error);
            exit;
        }
        // Prepare SQL statement to fetch user data
        $sql = "SELECT facility, email, first_name, last_name, phone FROM users WHERE user_id = ?";

        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);  // 'i' indicates integer type for the user ID

        // Execute the query
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        // Check if any rows were returned
        if ($result->num_rows > 0) {
            // Fetch user data as an associative array
            $userData = $result->fetch_assoc();
        } else {
            // No user data found for the given user ID
            $userData = null;
        }

        // Close the statement and database connection
        $stmt->close();
        $conn->close();

        // Return the fetched user data (or null if no data found)
        return $userData;
    } catch (Exception $e) {
        // Database connection or query execution failed
        // Log the error
        error_log("Error: " . $e->getMessage());

        // Send a 500 response
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database error"));
        exit;
    }
}
