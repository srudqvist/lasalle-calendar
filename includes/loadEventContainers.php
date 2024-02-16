<?php

// Establish a connection to the database

include '../../../lasalle-calendar-env-variables/config.php';
// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_database);
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve event containers
$sql = "SELECT * FROM event_containers";

// Execute the query
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        // Access each column of the row and do something with the data
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

        // Here, you can use the retrieved data to generate HTML content for each event container
        echo "<div class='eventContainer' style='--event-color: $color;'>";
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

// Close the connection
$conn->close();
