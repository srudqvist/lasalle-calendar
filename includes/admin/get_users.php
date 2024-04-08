<?php

include '../../../../lasalle-calendar-env-variables/config.php';


session_start();

//if (isset($_SESSION['admin'])) {
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize the input
    $requestBody = file_get_contents('php://input');

    // Parse JSON data
    $requestData = json_decode($requestBody, true);

    // Check if JSON data was successfully parsed
    if ($requestData === null) {
        // JSON parsing failed
        http_response_code(400); // Bad Request
        echo json_encode(array("success" => false, "message" => "Invalid JSON data"));
        exit;
    }

    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);

    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    $getUsersQuery = 'SELECT * FROM users';
    $getUsersStatement = $conn->prepare($getUsersQuery);
    $getUsersStatement->execute();
  $result = $getUsersStatement->get_result();
   
  $users = array();

  while ($row = $result->fetch_assoc) {
    $users[] = $row['user_id'];
  }

  if (!empty($users)) {
    echo json_encode('success' => true, 'users' => $users);
  } else {
    echo json_encode(array("success" => false, 'message' => 'No users found'));
  }

  // if ($result->num_rows > 0) {
  //   while (row = $result->fetch_assoc()) {
  //           echo "<tr id='meeting{$row['meeting_id']}'>";
  //           echo "<td class='date-column'>{$row['meeting_date']}</td>";
  //           echo "<td class='time-column'>{$row['meeting_time']}</td>";
  //           echo "<td class='eventTitle-column'>{$row['event_name']}</td>";
  //           echo "<td class='name-column'>{$row['name']}</td>";
  //           echo "<td class='phone-column'>{$row['phone']}</td>";
  //           echo "<td class='email-column'><a href='mailto:{$row['email']}'>{$row['email']}</a></td>";
  //           echo "<td class='notes-column'><td1>{$row['notes']}</td1></td>";
  //           echo "<td class='cancel-column'><button class='cancel-button' id='{$row['meeting_id']}'>Cancel</button></td>";
  //           echo "</tr>";
  //   }
  // } else {
  //   echo '0 results';
  // }


    $conn->close();

} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
//} else {

//}
