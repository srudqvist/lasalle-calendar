<?php

include '../../../lasalle-calendar-env-variables/config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_start();
    $facility = isset($_POST["facility"]) ? htmlspecialchars($_POST["facility"]) : null;
    $firstName = isset($_POST["firstName"]) ? htmlspecialchars($_POST["firstName"]) : null;
    $lastName = isset($_POST["lastName"]) ? htmlspecialchars($_POST["lastName"]) : null;
    $phone = isset($_POST["phone"]) ? htmlspecialchars($_POST["phone"]) : null;
    $email = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : null;
    $password = isset($_POST["password"]) ? htmlspecialchars($_POST["password"]) : null;
    $confirmPassword = isset($_POST["confirmPassword"]) ? htmlspecialchars($_POST["confirmPassword"]) : null;

    // Test null value
    // $facility = isset($_POST["facility"]) ? null : htmlspecialchars($_POST["facility"]);
    $formInfo = array($facility, $firstName, $lastName, $phone, $email, $password, $confirmPassword);

    foreach ($formInfo as $value) {
        if ($value === null) {
            exit("Expected Data Was Not Provided");
        }
    }

    // Check if passwords match
    if ($password !== $confirmPassword) {
        exit("Passwords do not match");
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Connect to the database
    $mysqli = new mysqli($db_host, $db_username, $db_password, $db_database);

    // Check for connection errors
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Prepare SQL query to insert new user into the database
    $query = $mysqli->prepare("INSERT INTO users (facility, fname, lname, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)");
    $query->bind_param("ssssss", $facility, $firstName, $lastName, $phone, $email, $hashedPassword);
    // Execute the query
    if ($query->execute()) {
        echo "New user created successfully";
        // Redirect to login page or any other page
        header("Location: ../public/index.php");
        exit;
    } else {
        echo "Error creating user: " . $mysqli->error;
    }


    $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    // Close database connection
    $query->close();
    $mysqli->close();


    echo "Facility: ";
    echo "<br>";
    echo $facility;
    echo "<br>";

    echo "First Name:";
    echo "<br>";
    echo $firstName;
    echo "<br>";

    echo "Last Name: ";
    echo "<br>";
    echo $lastName;
    echo "<br>";

    echo "Phone: ";
    echo "<br>";
    echo $phone;
    echo "<br>";

    echo "Email: ";
    echo "<br>";
    echo $email;
    echo "<br>";
    echo "Password: ";
    echo "<br>";
    echo $password;
    echo "<br>";

    echo "Confirm Password: ";
    echo "<br>";
    echo $confirmPassword;
} else {
    header("Location: ../public/index.php");
}
