<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../lasalle-calendar-env-variables/config.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
  require_once "./generate_password.php";

    // Read the raw request body
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

    $email = isset($requestData['email']) ? htmlspecialchars($requestData['email']) : null;

    if ($email == null) {
        // Set HTTP response code to indicate a bad request
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Email missing"));
        exit; // Stop script execution
    }

    // Perform database connection
    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
    // Check connection
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    $newPassword = genrateRandomPassword();
    echo newPassword;

    // todo:
  // * Save the password to the db
  // * Send the password in email to the user


} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
