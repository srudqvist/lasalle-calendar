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

    $currentPassword =  isset($requestData['currentPassword']) ? htmlspecialchars($requestData['currentPassword']) : null;
    $newPassword =  isset($requestData['newPassword']) ? htmlspecialchars($requestData['newPassword']) : null;

    if ($currentPassword == null || $newPassword == null) {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid Data provided 1"));
        exit; // Stop script execution
    }

    if (!isValidPassword($newPassword)) {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid Data provided 2"));
        exit; // Stop script execution
    }


    $passwordMatch = checkCurrentPassword($currentPassword, $userId);
    error_log($passwordMatch);
    if (!$passwordMatch) {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid Data provided 3"));
        exit; // Stop script execution
    }

    updatePassword($newPassword, $userId);

} else {
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => "Invalid Request Method"]);
    exit;
}


function checkCurrentPassword($currentPassword, $userId)
{

    global $db_host, $db_username, $db_password, $db_database;
    try {
        // Perform database connection
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
        // Check connection
        if ($conn->connect_error) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Database connection error"));
            exit;
        }

        $getPasswordQuery = "SELECT password FROM users WHERE user_id = ?";
        $getPasswordStatement = $conn->prepare($getPasswordQuery);
        $getPasswordStatement->bind_param("i", $userId);

        if ($getPasswordStatement->execute() === false) {
            http_response_code(500);
            echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
            exit;
        }

        $result = $getPasswordStatement->get_result();

        if ($result -> num_rows == 1) {
            $row = $result -> fetch_assoc();
            if (password_verify(trim($currentPassword), trim($row['password']))) {
                return true;
            }
        }
        return false;
    } catch (Exception $e) {

        // Database connection or query execution failed
        // Log the error
        error_log("Error: " . $e->getMessage());

        // Send a 500 response
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database error"));
        exit;
    }

}

function updatePassword($newPassword, $userId)
{
    global $db_host, $db_username, $db_password, $db_database;
    try {
        // Perform database connection
        $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
        // Check connection
        if ($conn->connect_error) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Database connection error"));
            exit;
        }

        $passwordReset = 0;

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordQuery = "UPDATE users SET password = ?, password_reset = ? WHERE user_id = ?";
        $updatePasswordStatement = $conn->prepare($updatePasswordQuery);
        $updatePasswordStatement->bind_param("sii", $hashedPassword, $passwordReset, $userId);

        if ($updatePasswordStatement->execute() === false) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
            exit;
        } else {
            header('Content-Type: application/json');
            http_response_code(203);
            echo json_encode(['success' => true, 'message' => "User Information updated successfully"]);
            exit;
        }
    } catch (Exception $e) {
        // Database connection or query execution failed
        // Log the error
        error_log("Error: " . $e->getMessage());

        // Send a 500 response
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database error"));
        exit;
    }
}
