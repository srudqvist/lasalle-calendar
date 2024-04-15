<?php

include '../../../../lasalle-calendar-env-variables/config.php';

session_start();

//if (isset($_SESSION['admin'])) {
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

    $userId = isset($requestData['userId']) ? htmlspecialchars($requestData['userId']) : null;
    $facility = isset($requestData['facility']) ? htmlspecialchars($requestData['facility']) : null;

    if ($userId === null || $facility === null) {
        error_log("Received : " . $_POST['userId']);
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "User ID or userStatus not provided"));
        exit; // Stop script execution
    }

    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    $changeFacilityStatement = $conn->prepare('UPDATE users SET facility = ? WHERE user_id = ?');
    $changeFacilityStatement->bind_param("si", $facility, $userId);

    if ($changeFacilityStatement->execute()) {
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "User Facility Updated"));
        exit;
    } else {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(array("success" => false, "message" => "User Facility Could Not Be Updated"));
        exit;
    }

} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
