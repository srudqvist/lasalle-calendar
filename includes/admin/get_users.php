<?php

/**
 * Get Users Endpoint
 *
 * This PHP script serves as an endpoint for retrieving users' information.
 * It expects a POST request and returns JSON data containing information about all users in the database.
 *
 * HTTP Methods:
 * - POST: Retrieves information about all users and returns it as JSON data.
 *
 */

include '../../../../lasalle-calendar-env-variables/config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize the input
    $requestBody = file_get_contents('php://input');

    // Parse JSON data
    $requestData = json_decode($requestBody, true);

    // Check if JSON data was successfully parsed
    if ($requestData === null) {
        // JSON parsing failed
        http_response_code(400); // Bad Request
        echo json_encode(array("success" => false, "message" => "Invalid JSON data"));
        exit;
    }

    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    $getUsersQuery = 'SELECT user_id, facility, last_name, first_name, email, secondary_email, phone, isActive FROM users';
    $getUsersStatement = $conn->prepare($getUsersQuery);
    $getUsersStatement->execute();
    $result = $getUsersStatement->get_result();

    $users = array();

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
        error_log($row['user_id']);
    }

    if (!empty($users)) {
        echo json_encode(array("success" => true, "users" => $users));
    } else {
        echo json_encode(array("success" => false, "message" => 'No users found'));
    }

    $getUsersStatement->close();
    $conn->close();

} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
