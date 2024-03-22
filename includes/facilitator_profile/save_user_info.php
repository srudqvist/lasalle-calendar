<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../../lasalle-calendar-env-variables/config.php';
require_once '../validationFunctions/validation_functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debugging: Dump the received POST data to inspect it

    session_start();
    // Make sure user id is set
    if (!isset($_SESSION['id'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(array("success" => false, "message" => "User not authorized"));
        exit;
    }

    $userId = $_SESSION['id'];
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
    $firstName =  isset($requestData['firstName']) ? htmlspecialchars($requestData['firstName']) : null;
    $lastName =  isset($requestData['lastName']) ? htmlspecialchars($requestData['lastName']) : null;
    $primaryEmail =  isset($requestData['primaryEmail']) ? htmlspecialchars($requestData['primaryEmail']) : null;
    $secondaryEmail =  isset($requestData['secondaryEmail']) ? htmlspecialchars($requestData['secondaryEmail']) : null;
    $phone =  isset($requestData['phone']) ? htmlspecialchars($requestData['phone']) : null;

    if ($secondaryEmail != null) {
        if (!isValidEmail($secondaryEmail)) {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Invalid Data provided"));
            exit; // Stop script execution
        }
    }

    if (!isValidName($firstName) || !isValidName($lastName) || !isValidEmail($primaryEmail) || !isValidPhone($phone)) {
        // Set HTTP response code to indicate a bad request
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid Data provided"));
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
    $saveInfoQuery = "UPDATE users SET first_name = ?, last_name = ?, email = ?, secondary_email = ?, phone = ? WHERE user_id = ?";
    $saveInfoStatement = $conn->prepare($saveInfoQuery);
    $saveInfoStatement->bind_param("sssssi", $firstName, $lastName, $primaryEmail, $secondaryEmail, $phone, $userId);

    if ($saveInfoStatement->execute() === false) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
        exit;
    } else {

        header('Content-Type: application/json');
        http_response_code(203);
        echo json_encode(['success' => true, 'message' => "User Information updated successfully"]);
        exit;
    }
}
