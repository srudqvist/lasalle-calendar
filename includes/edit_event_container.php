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

if ($_SERVER["REQUEST_METHOD"] == "POST") {

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
    // Check if facility information exists in the session
    if(isset($_SESSION['facility'])) {
        // Retrieve facility from session
        $facility = $_SESSION['facility'];
        $eventName = isset($requestData['eventName']) ? htmlspecialchars($requestData['eventName']) : null;
        $startDay = isset($requestData['startDay']) ? htmlspecialchars($requestData['startDay']) : null;
        $endDay = isset($requestData['endDay']) ? htmlspecialchars($requestData['endDay']) : null;
        $startTime = isset($requestData['startTime']) ? htmlspecialchars($requestData['startTime']) : null;
        $endTime = isset($requestData['endTime']) ? htmlspecialchars($requestData['endTime']) : null;
        $duration = isset($requestData['duration']) ? htmlspecialchars($requestData['duration']) : null;
        $timeZone = isset($requestData['timeZone']) ? htmlspecialchars($requestData['timeZone']) : null;
        $meetingType = isset($requestData['meetingType']) ? htmlspecialchars($requestData['meetingType']) : null;
        $description = isset($requestData['description']) ? htmlspecialchars($requestData['description']) : null;
        $color = isset($requestData['eventColor']) ? htmlspecialchars($requestData['eventColor']) : null;
        $eventContainerID = isset($requestData['eventContainerID']) ? htmlspecialchars($requestData['eventContainerID']) : null;

        // Check if all required data is provided
        $eventInfo = array($facility, $eventName, $startDay, $endDay, $endTime, $duration, $timeZone, $meetingType, $color, $eventContainerID);
        error_log("Event Info: " . print_r($eventInfo, true));
        foreach ($eventInfo as $value) {
            if ($value === null) {
                echo json_encode(array("success" => false, "message" => "Expected Data Was Not Provided"));
                exit("Expected Data Was Not Provided");
            }
        }

        // Perform database connection
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
        // Check connection
        if ($conn->connect_error) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Database connection error"));
            exit;
        }

        $editQuery = $conn->prepare("UPDATE event_containers SET event_name = ?, start_day = ?, end_day = ?, start_time = ?, end_time = ?, duration = ?, time_zone = ?, meeting_type = ?, description = ?, color = ? WHERE event_container_id = ?");
        $editQuery->bind_param("ssssssssssi", $eventName, $startDay, $endDay, $startTime, $endTime, $duration, $timeZone, $meetingType, $description, $color, $eventContainerID);

        if ($editQuery->execute() === false) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
            exit;

        } else {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => "Event Container updated successfully"]);
            exit;
        }

    } else {
        // Facility information not found in session
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Facility information not found in session"));
        exit;
    }
} else {
    // Handle invalid request method
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
    exit;
}
