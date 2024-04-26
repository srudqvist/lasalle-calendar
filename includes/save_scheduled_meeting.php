<?php
/**
 * Meeting Creation Endpoint
 *
 * This PHP script serves as an endpoint for creating new meetings. It receives POST requests with form data containing meeting information.
 * It validates the received data and inserts a new meeting record into the database if the data is valid.
 *
 * HTTP Methods:
 * - POST: Accepts POST requests containing form data for meeting creation.
 *
 * Request Data Parameters:
 * - containerId: The ID of the event container associated with the meeting.
 * - date: The date of the meeting.
 * - time: The time of the meeting.
 * - name: The name of the attendee.
 * - email: The email of the attendee.
 * - timezone: The timezone of the meeting.
 * - comments: Any additional comments about the meeting.
 *
 * Response Format:
 * - JSON: Returns a JSON response indicating the success or failure of the meeting creation process.
 *
 */

include '../../../lasalle-calendar-env-variables/config.php';
// Add something to the link to make sure it is sent from a facilitator?

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $containerId = isset($_POST['containerId']) ? htmlspecialchars($_POST['containerId']) : null;

    if ($containerId === null) {
        exit("Container ID not provided");
    }

    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $getEventInfo = "SELECT facility, event_name FROM event_containers WHERE event_container_id = ?";
    $getEventInfoSTMT = $conn->prepare($getEventInfo);
    $getEventInfoSTMT->bind_param("i", $containerId);


    // Execute the SQL statement
    if ($getEventInfoSTMT->execute() === true) {
        $eventInfo = $getEventInfoSTMT->get_result();
        if ($eventInfo->num_rows > 0) {
            while($row = $eventInfo->fetch_assoc()) {
                $facility = $row["facility"];
                $eventName = $row["event_name"];
            }
            $getEventInfoSTMT->close();
            $conn->close();

            $date = isset($_POST['date']) ? htmlspecialchars($_POST['date']) : null;
            $time = isset($_POST['time']) ? htmlspecialchars($_POST['time']) : null;
            $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : null;
            $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : null;
            $timezone = isset($_POST['timezone']) ? htmlspecialchars($_POST['timezone']) : null;
            $comments = isset($_POST['comments']) ? htmlspecialchars($_POST['comments']) : null;

            $meetingInfo = array($facility, $eventName, $date, $time, $name, $email, $timezone, $comments);

            foreach ($meetingInfo as $value) {
                if ($value === null) {
                    exit("Expected Data Was Not Provided");
                }
            }

            $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
            $saveMeeting = "INSERT INTO scheduled_meetings (event_id, facility, name, meeting_date, meeting_time, event_name, email, notes) VALUES (?,?,?,?,?,?,?,?)";
            $saveMeetingSTMT = $conn->prepare($saveMeeting);
            $saveMeetingSTMT->bind_param("isssssss", $containerId, $facility, $name, $date, $time, $eventName, $email, $comments);

            if ($saveMeetingSTMT->execute() === true) {
                $saveMeetingSTMT->close();
                $conn->close();

                session_start();
                $_SESSION['meeting_details'] = array(
                    'facility' => $facility,
                    'eventName' => $eventName,
                    'date' => $date,
                    'time' => $time,
                    'name' => $name,
                    'email' => $email,
                    'timezone' => $timezone,
                    'comments' => $comments
                );

                session_write_close();
                exit(json_encode(array("success" => true, "message" => "Saved Meeting Successfully")));
            } else {
                echo json_encode(array("success" => false, "message" => "Unable to Save Meeting"));
                $saveMeetingSTMT->close();
                $conn->close();
            }
        } else {
            echo "0 results";
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error Getting Event Info"));
    }

} else {
    // Handle invalid request method
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
