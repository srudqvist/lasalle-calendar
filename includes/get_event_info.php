<?php

/**
 * Get Event Container Data Endpoint
 *
 * This PHP script serves as an endpoint for retrieving event container data.
 * It expects a container ID as a query parameter in the URL.
 * The script retrieves the event container data from the database based on the provided ID.
 * It then returns the event container data as a JSON response.
 *
 * HTTP Methods:
 * - GET: Retrieves event container data based on the container ID provided in the URL.
 *
*/

include '../../../lasalle-calendar-env-variables/config.php';

$containerId = isset($_GET['containerId']) ? $_GET['containerId'] : null;

if ($containerId) {
    // Connect to the database
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_database);

    // Check for connection errors
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $query = $mysqli->prepare("SELECT * FROM event_containers WHERE event_container_id = ?");
    $query->bind_param("i", $containerId);
    $query->execute();
    $result = $query->get_result();

    if ($result -> num_rows == 1) {
        $row = $result -> fetch_assoc();
        $query->close();
        $mysqli->close();

        // Return the data as JSON
        header('Content-Type: application/json');
        echo json_encode($row);
    } else {
        // No matching container found
        $mysqli->close();
        http_response_code(404);
        exit();
    }

} else {
    // No containerId provided in the URL
    http_response_code(404);
    exit();
}
