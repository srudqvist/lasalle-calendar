<?php
/**
 * Load Event Containers Endpoint
 *
 * This PHP script serves as an endpoint for displaying event containers associated with a specific facility.
 * It retrieves event containers from the database based on the facility stored in the user's session.
 * The retrieved event containers are then displayed on the webpage.
 *
 * HTTP Methods:
 * - GET: Retrieves event containers and displays them on the webpage.
 *
 * Session Data:
 * - facility: The facility associated with the logged-in user.
 *
 */
include '../../../lasalle-calendar-env-variables/config.php';
$conn = new mysqli($db_host, $db_username, $db_password, $db_database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();
// Check if facility information exists in the session
if(isset($_SESSION['facility'])) {
    $facility = $_SESSION['facility'];
    $sql = "SELECT * FROM event_containers WHERE (facility = ? AND isDeleted != 1)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $facility);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
            $eventContainerID = $row["event_container_id"];
            $facility = $row["facility"];
            $eventName = $row["event_name"];
            $startDay = $row["start_day"];
            $endDay = $row["end_day"];
            $startTime = $row["start_time"];
            $endTime = $row["end_time"];
            $duration = $row["duration"];
            $timeZone = $row["time_zone"];
            $meetingType = $row["meeting_type"];
            $description = $row["description"];
            $color = $row["color"];

            echo "<div id='$eventContainerID' class='eventContainer' style='--event-color: $color;'>";
            echo "<h2 class='event-headline'>$eventName</h4>";
            echo "<h4 class='day-range'>$startDay - $endDay</h4>";
            echo "<h4 class='time-range'>$startTime - $endTime</h4>";
            echo "<h4 class='duration' style='display:none;'>Duration: $duration</h4>";
            echo "<h4 class='time-zone' style='display:none;'>$timeZone</h4>";
            echo "<h4 class='meeting-type'>Meeting By: $meetingType</h4>";
            echo "<p id='description$eventContainerID' style='display:none;'>$description</p>";
            echo "<div class='button-div'>";
            echo "<button id='viewCalendarButton$eventContainerID' class='event-container-button' style='--event-color-darker: $color;'>View Calendar</button>";
            echo "<button id='copyLinkButton$eventContainerID' class='event-container-button' style='--event-color-darker: $color;'>Copy Link</button>";
            echo "<button id='editButton$eventContainerID' class='event-container-button' style='--event-color-darker: $color;'>Edit</button>";
            echo "<button id='deleteButton$eventContainerID' class='event-container-button' style='--event-color-darker: $color;'>Delete</button>";
            echo "</div>"; // Close button-div
            echo "</div>"; // Close eventContainerDiv
        }
    } else {
        echo "";
        //echo "<div class='no-data center_content'><p>Add an event container</p></div>";
    }
}

$conn->close();
