<?php
/**
 * Password Reset Endpoint
 *
 * This PHP script serves as an endpoint for resetting user passwords.
 * It expects a POST request with the user's email address.
 * The script generates a random password, emails it to the user, and updates the password in the database.
 *
 * HTTP Methods:
 * - POST: Resets the user's password based on the provided email address.
 *
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);
include '../../../../lasalle-calendar-env-variables/config.php';



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once "./generate_password.php";
    require_once "./email_password.php";

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

    $newPassword = generateRandomPassword();
    error_log($newPassword);
    //$emailSent = sendPasswordEmail("samuel.rudqvist@outlook.com", $newPassword);
    //error_log($emailSent);

    // Hash the password
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $passwordReset = 1;

    $changePasswordQuery = "UPDATE users SET password = ?, password_reset = ? WHERE email = ?";
    $changePasswordStatement = $conn->prepare($changePasswordQuery);
    $changePasswordStatement->bind_param("sis", $hashedPassword, $passwordReset, $email);

    if ($changePasswordStatement->execute() === false) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
        exit;
    } else {

        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => "Password reset successfully"]);
        exit;
    }

} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
