<?php
/**
 * Delete Event Container Endpoint
 *
 * This PHP script serves as an endpoint for deleting an event container.
 * It expects a POST request with the event container ID to be deleted.
 * The script validates the provided ID and then marks the event container as deleted in the database.
 *
 * HTTP Methods:
 * - POST: Deletes an event container based on the provided ID.
 *
 * Note: The event container is not deleted but only flagged as deleted
 *
 */

include '../../../lasalle-calendar-env-variables/config.php';

// Check if the event container ID is provided in the request
if (isset($_POST['event_container_id'])) {
    // Sanitize the input
    $eventContainerID = $_POST['event_container_id'];

    // Create a connection to the database
    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the SQL update statement
    $stmt = $conn->prepare("UPDATE event_containers SET isDeleted = TRUE WHERE event_container_id = ?");
    $stmt->bind_param("i", $eventContainerID);

    if ($stmt->execute()) {
        echo "Event container deleted successfully";
    } else {
        echo "Error deleting event container";
    }

} else {
    echo "Event container ID not provided";
}
