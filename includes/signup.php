<?php

include '../../../lasalle-calendar-env-variables/config.php';
require_once './validationFunctions/validation_functions.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
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

    $facility =  isset($requestData['facility']) ? htmlspecialchars($requestData['facility']) : null;
    $firstName =  isset($requestData['firstName']) ? htmlspecialchars($requestData['firstName']) : null;
    $lastName =  isset($requestData['lastName']) ? htmlspecialchars($requestData['lastName']) : null;
    $email =  isset($requestData['email']) ? htmlspecialchars($requestData['email']) : null;
    $phone =  isset($requestData['phone']) ? htmlspecialchars($requestData['phone']) : null;
    $password =  isset($requestData['password']) ? htmlspecialchars($requestData['password']) : null;
    $confirmPassword =  isset($requestData['confirmPassword']) ? htmlspecialchars($requestData['confirmPassword']) : null;

    if (!isValidName($firstName) || !isValidName($lastName) || !isValidEmail($email) || !isValidPhone($phone) || !isValidPassword($password)) {
        // Set HTTP response code to indicate a bad request
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Invalid Data provided"));
        exit; // Stop script execution
    }

    // Check if passwords match
    if ($password !== $confirmPassword) {
        exit("Passwords do not match");
    }
    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Perform database connection
    $conn = new mysqli($db_host, $db_username, $db_password, $db_database);
    // Check connection
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Database connection error"));
        exit;
    }

    $signupQuery = $conn->prepare("INSERT INTO users (facility, email, first_name, last_name, phone, password) VALUES (?, ?, ?, ?, ?, ?)");
    $signupQuery->bind_param("ssssss", $facility, $email, $firstName, $lastName, $phone, $hashedPassword);

    if ($signupQuery->execute() === false) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("success" => false, "message" => "Error executing SQL query"));
        exit;

    } else {
        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode(['success' => true, 'message' => "User Saved successfully"]);
        exit;
    }

} else {
    http_response_code(405); // Internal Server Error
    echo json_encode(array("success" => false, "message" => "Wrong HTTP Method"));
    exit;
}
