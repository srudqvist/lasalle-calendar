<?php

include '../../../lasalle-calendar-env-variables/config.php';
$conn = new mysqli($db_host, $db_username, $db_password, $db_database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();
// Check if facility information exists in the session
if(isset($_SESSION['facility'])) {
    $facility = $_SESSION['facility'];
    $sql = "SELECT * FROM scheduled_meetings WHERE (facility = ? AND isDeleted != 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $facility);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        echo '<div id="scheduledTableDiv" class="center_content">';
        echo '<table id="outerTable">';
        echo '<tr><th id="tableHeader">Scheduled Meetings</th></tr>';
        echo '<tr><td class="center_content"><br><table id="innerTable">';
        echo '<tr>';
        echo '<th class="green-background"><f1>Date</f1></th>';
        echo '<th class="green-background"><f1>Time</f1></th>';
        echo '<th class="green-background"><f1>Event</f1></th>';
        echo '<th class="green-background"><f1>Name</f1></th>';
        echo '<th class="green-background"><f1>Phone</f1></th>';
        echo '<th class="green-background"><f1>Email</f1></th>';
        echo '<th class="green-background"><f1>Notes</f1></th>';
        echo '<th class="green-background"><f1>Cancel</f1></th>';
        echo '</tr>';

        while ($row = $result->fetch_assoc()) {
            echo "<tr id='meeting{$row['meeting_id']}'>";
            echo "<td class='date-column'>{$row['meeting_date']}</td>";
            echo "<td class='time-column'>{$row['meeting_time']}</td>";
            echo "<td class='eventTitle-column'>{$row['event_name']}</td>";
            echo "<td class='name-column'>{$row['name']}</td>";
            echo "<td class='phone-column'>{$row['phone']}</td>";
            echo "<td class='email-column'><a href='mailto:{$row['email']}'>{$row['email']}</a></td>";
            echo "<td class='notes-column'><td1>{$row['notes']}</td1></td>";
            echo "<td class='cancel-column'><button class='cancel-button' id='{$row['meeting_id']}'>Cancel</button></td>";
            echo "</tr>";
        }
        echo '</table><br></td></tr></table></div>';
    } else {
        echo "<div class='no-data center_content'><p>There are no meetings scheduled yet</p></div>";
    }
}
$conn->close();
