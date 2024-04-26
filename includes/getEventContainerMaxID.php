<?php

/**
 * Get Highest Event Container ID Endpoint
 *
 * This PHP script serves as an endpoint for retrieving the highest event container ID from the database.
 * It retrieves the maximum event container ID from the database table "event_containers".
 * The retrieved highest ID is then echoed back as the response.
 *
 * HTTP Methods:
 * - GET: Retrieves the highest event container ID from the database.
 *
 */

include '../../../lasalle-calendar-env-variables/config.php';
$conn = new mysqli($db_host, $db_username, $db_password, $db_database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT MAX(event_container_id) AS max_id FROM event_containers";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$highestId = $row["max_id"];

$conn->close();

echo $highestId;
