<?php

include '../../../lasalle-calendar-env-variables/config.php';
// Make sure request is of the right type
//var_dump($_SERVER["REQUEST_METHOD"]);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = htmlspecialchars($_POST["email"]);
    $password = htmlspecialchars($_POST["password"]);

    // Connect to the database
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_database);

    // Check for connection errors
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
    echo "Connection Successful";
    // Prepare SQL query to retrieve user with the provided email
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    //Echo the result
    while ($row = $result->fetch_assoc()) {
        echo "User ID: " . $row['uid'] . "<br>";
        echo "Facility: " . $row['facility'] . "<br>";
        echo "Email: " . $row['email'] . "<br>";
        echo "First Name: " . $row['fname'] . "<br>";
        echo "Last Name: " . $row['lname'] . "<br>";
        echo "Phone: " . $row['phone'] . "<br>";
    }

    //header("Location: ../public/eventContainers.php");
} else {
    header("Location: ../public/index.php");
}
