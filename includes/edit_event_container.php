
<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../lasalle-calendar-env-variables/config.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    // Check if facility information exists in the session
    if(isset($_SESSION['facility'])) {
        // Retrieve facility from session
        $facility = $_SESSION['facility'];

        // Extract form data
        $eventName = isset($_POST['eventName']) ? htmlspecialchars($_POST['eventName']) : null;
        $startDay = isset($_POST['dayFrom']) ? htmlspecialchars($_POST['dayFrom']) : null;
        $endDay = isset($_POST['dayTo']) ? htmlspecialchars($_POST['dayTo']) : null;
        $startTime = isset($_POST['startTime']) ? htmlspecialchars($_POST['startTime']) : null;
        $endTime = isset($_POST['endTime']) ? htmlspecialchars($_POST['endTime']) : null;
        $duration = isset($_POST['duration']) ? htmlspecialchars($_POST['duration']) : null;
        $timeZone = isset($_POST['timeZone']) ? htmlspecialchars($_POST['timeZone']) : null;
        $meetingType = isset($_POST['meetingType']) ? htmlspecialchars($_POST['meetingType']) : null;
        $description = isset($_POST['description']) ? htmlspecialchars($_POST['description']) : "";
        $color = isset($_POST['eventColor']) ? htmlspecialchars($_POST['eventColor']) : null;
        $eventContainerID = isset($_POST['eventContainerID']) ? htmlspecialchars($_POST['eventContainerID']) : null;

        // Check if all required data is provided
        $eventInfo = array($facility, $eventName, $startDay, $endDay, $endTime, $duration, $timeZone, $meetingType, $color, $eventContainerID);
        error_log("Event Info: " . print_r($eventInfo, true));
        foreach ($eventInfo as $value) {
            if ($value === null) {
                exit("Expected Data Was Not Provided");
            }
        }

        // Create a new MySQLi object
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepare SQL statement to update data in the event_containers table
        $sql = "UPDATE event_containers SET event_name=?, start_day=?, end_day=?, start_time=?, end_time=?, duration=?, time_zone=?, meeting_type=?, description=?, color=? WHERE event_container_id=?";

        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssss", $eventName, $startDay, $endDay, $startTime, $endTime, $duration, $timeZone, $meetingType, $description, $color, $eventContainerID);

        // Execute the SQL statement
        if ($stmt->execute() === true) {
            $stmt->close();
            $conn->close();
            exit(json_encode(array("success" => true, "message" => "Event container updated successfully")));
        } else {
            echo json_encode(array("success" => false, "message" => "Error updating event container"));
        }
    } else {
        // Facility information not found in session
        echo json_encode(array("success" => false, "message" => "Facility information not found in session"));
    }
} else {
    // Handle invalid request method
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
