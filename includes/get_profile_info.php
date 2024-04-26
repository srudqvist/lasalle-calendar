<?php

/**
 * Profile Data Endpoint
 *
 * This PHP script serves as an endpoint for retrieving user data.
 * It expects a POST request with the user's ID in the session.
 * It retrieves user data from the database based on the provided user ID.
 * The script then returns the user data as a JSON response.
 *
 * HTTP Methods:
 * - POST: Retrieves user data based on the user's ID.
 *
 */

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

$userId = $_SESSION['id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $userData = getUserData($userId);

    if ($userData) {
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
        $sql = "SELECT facility, email, secondary_email, first_name, last_name, facility, phone FROM users WHERE user_id = ?";

        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);

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
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database error"));
        exit;
    }
}
