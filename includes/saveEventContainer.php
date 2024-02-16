<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include '../../../lasalle-calendar-env-variables/config.php';

// Start or resume session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if facility information exists in the session
    if(isset($_SESSION['facility'])) {
        // Retrieve facility from session
        $facility = $_SESSION['facility'];

        // Create a new MySQLi object
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Retrieve and sanitize form data
        $eventName = mysqli_real_escape_string($conn, $_POST['eventName']);
        $startDay = mysqli_real_escape_string($conn, $_POST['dayFrom']);
        $endDay = mysqli_real_escape_string($conn, $_POST['dayTo']);
        $startTime = mysqli_real_escape_string($conn, $_POST['startTime']);
        $endTime = mysqli_real_escape_string($conn, $_POST['endTime']);
        $timeZone = mysqli_real_escape_string($conn, $_POST['timeZone']);
        $meetingType = mysqli_real_escape_string($conn, $_POST['meetingType']);
        $description = mysqli_real_escape_string($conn, $_POST['description']);
        $color = mysqli_real_escape_string($conn, $_POST['eventColor']);

        echo $eventName;
        // Prepare SQL statement to insert data into the event_containers table
        $sql = "INSERT INTO event_containers (facility, event_name, start_day, end_day, start_time, end_time, time_zone, meeting_type, description, color) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssssss", $facility, $eventName, $startDay, $endDay, $startTime, $endTime, $timeZone, $meetingType, $description, $color);

        // Execute the SQL statement
        if ($stmt->execute() === true) {
            echo "New record created successfully";
            echo "Event name: $eventName";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    } else {
        // Facility information not found in session
        echo json_encode(array("success" => false, "message" => "Facility information not found in session"));
    }
} else {
    // Handle invalid request method
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
