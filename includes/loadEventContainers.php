<?php

include '../../../lasalle-calendar-env-variables/config.php';
$conn = new mysqli($db_host, $db_username, $db_password, $db_database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM event_containers";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        $eventContainerID = $row["event_container_id"];
        $facility = $row["facility"];
        $eventName = $row["event_name"];
        $startDay = $row["start_day"];
        $endDay = $row["end_day"];
        $startTime = $row["start_time"];
        $endTime = $row["end_time"];
        $timeZone = $row["time_zone"];
        $meetingType = $row["meeting_type"];
        $description = $row["description"];
        $color = $row["color"];

        echo "<div id='$eventContainerID' class='eventContainer' style='--event-color: $color;'>";
        echo "<h2 class='event-headline'>$eventName</h4>";
        echo "<h4 class='day-range'>$startDay - $endDay</h4>";
        echo "<h4 class='time-range'>$startTime - $endTime</h4>";
        echo "<h4 class='duration'>30 min</h4>";
        echo "<h4 class='time-zone'>$timeZone</h4>";
        echo "<h4 class='meeting-type'>$meetingType</h4>";
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
    echo "0 results";
}

$conn->close();
