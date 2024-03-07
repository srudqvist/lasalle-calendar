<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../lasalle-calendar-env-variables/config.php';

// Check if the event container ID is provided in the request
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

    $meetingID = isset($requestData['meetingID']) ? htmlspecialchars($requestData['meetingID']) : null;
    error_log("Meeting ID: $meetingID");
    if ($meetingID === null) {
        error_log("Received meetingID: " . $_POST['meetingID']);
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Meeting ID not provided"));
        exit; // Stop script execution
    }
    // Create a connection to the database
    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    // Prepare and execute the SQL update statement
    $stmt = $conn->prepare("UPDATE scheduled_meetings SET isDeleted = TRUE WHERE meeting_id = ?");
    $stmt->bind_param("i", $meetingID);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Meeting deleted successfully"));
    } else {
        echo json_encode(array("success" => false, "message" => "There was en error deleting the meeting"));
    }
} else {

    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
