<?php

// Checkout: https://codeshack.io/secure-login-system-php-mysql/
include '../../../lasalle-calendar-env-variables/config.php';
// Make sure request is of the right type
//var_dump($_SERVER["REQUEST_METHOD"]);
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (!isset($_POST["email"], $_POST["password"])) {
        // expected data was not provided
        exit("Expected Data Was Not Provided");
    }
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
    $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();
    //Echo the result
    // while ($row = $result->fetch_assoc()) {
    //     echo "User ID: " . $row['uid'] . "<br>";
    //     echo "Facility: " . $row['facility'] . "<br>";
    //     echo "Email: " . $row['email'] . "<br>";
    //     echo "First Name: " . $row['fname'] . "<br>";
    //     echo "Last Name: " . $row['lname'] . "<br>";
    //     echo "Phone: " . $row['phone'] . "<br>";
    // }

    if ($result -> num_rows == 1) {
        $row = $result -> fetch_assoc();

        echo "Password from submission: " . $password . "<br>";
        echo "Password from DB: " . $row['password'] . "<br>";
        $password_hash = password_hash($row['password'], PASSWORD_DEFAULT);
        echo "Password hash: " . $password_hash . "<br>";
        if (password_verify($password, $password_hash)) {
            header("Location: ../public/eventContainers.php");
            exit;
        } else {
            header("Location: ../public/index.php?error=invalid_credentials");
            exit;
        }
    } else {
        header("Location: ../public/index.php?error=user_not_found");
        exit;
    }
    // Close database connection
    $stmt->close();
    $mysqli->close();

} else {
    header("Location: ../public/index.php");
}
