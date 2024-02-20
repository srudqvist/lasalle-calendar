<?php

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
