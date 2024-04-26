<?php
/**
 * Get Scheduled Meetings Endpoint
 *
 * This PHP script serves as an endpoint for retrieving scheduled meetings for a given event container ID and date.
 * It expects a POST request with JSON data containing the event container ID and date.
 * It queries the database for scheduled meetings matching the provided container ID and date.
 * The script then returns the meeting times as a JSON response.
 *
 * HTTP Methods:
 * - POST: Retrieves scheduled meetings for a given event container ID and date.
 *
 */

include '../../../lasalle-calendar-env-variables/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Read the raw request body
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

    // Extract containerId and date from JSON data
    $containerId = isset($requestData['containerId']) ? htmlspecialchars($requestData['containerId']) : null;
    $date = isset($requestData['date']) ? htmlspecialchars($requestData['date']) : null;

    // Check if containerId and date are provided in the POST data
    if ($containerId === null || $date === null) {
        // Log the received containerId and date for debugging
        error_log("Received containerId: " . $_POST['containerId']);
        error_log("Received date: " . $_POST['date']);

        // Set HTTP response code to indicate a bad request
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Container ID or Date not provided"));
        exit; // Stop script execution
    }

    // Perform database connection
    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
    // Check connection
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    // Prepare and execute SQL query
    $getScheduledMeetings = "SELECT * FROM scheduled_meetings WHERE ((event_id = ? AND meeting_date = ?) AND isDeleted = 0)";
    $getScheduledMeetingsSTMT = $conn->prepare($getScheduledMeetings);
    $getScheduledMeetingsSTMT->bind_param("is", $containerId, $date);

    if ($getScheduledMeetingsSTMT->execute() === false) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
        exit;
    }

    // Fetch and process query results
    $scheduledMeetingsResult = $getScheduledMeetingsSTMT->get_result();
    $meetings = array();
    while($row = $scheduledMeetingsResult->fetch_assoc()) {
        $meetings[] = $row["meeting_time"];
    }

    // Send response based on query results
    if (!empty($meetings)) {
        echo json_encode($meetings);
    } else {
        echo json_encode(array("success" => false, "message" => "No meetings found"));
    }

    // Close prepared statement and database connection
    $getScheduledMeetingsSTMT->close();
    $conn->close();
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
