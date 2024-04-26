<?php
/**
 * User Authentication Endpoint
 *
 * This PHP script serves as an endpoint for authenticating users. It receives POST requests with user credentials and verifies them against the database.
 * If the credentials are valid, it creates sessions to maintain user login state.
 *
 * HTTP Methods:
 * - POST: Accepts POST requests containing user credentials for authentication.
 *
 * Request Data Parameters:
 * - email: The email address of the user.
 * - password: The password of the user.
 *
 * Response:
 * - Redirects the user to appropriate pages based on the authentication result.
 *
 */

include '../../../lasalle-calendar-env-variables/config.php';
require_once './validationFunctions/validation_functions.php';

// Make sure request is of the right type
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    session_start();

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

    // Prepare SQL query to retrieve user with the provided email
    $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();

    if ($result -> num_rows == 1) {
        $row = $result -> fetch_assoc();

        if ($row["isActive"] == 0) {
            $_SESSION['login_error_msg'] = "User Account Inactive, Please Contact Your System Administrator";
            header("Location: ../public/index.php");
            exit;
        }

        if (password_verify(trim($password), trim($row['password']))) {
            // Create sessions, so we know the user is logged in, they basically act like cookies but remember the data on the server.
            session_regenerate_id();
            $_SESSION['loggedin'] = true;
            $_SESSION['email'] = $row['email'];
            $_SESSION['first_name'] = $row['first_name'];
            $_SESSION['last_name'] = $row['last_name'];
            $_SESSION['id'] = $row['user_id'];
            $_SESSION['facility'] = $row['facility'];
            echo 'Welcome back, ' . htmlspecialchars($_SESSION['fname'], ENT_QUOTES) . '!';
            if ($row['password_reset'] == 1) {
                header("Location: ../public/facilitator_profile.php?passwordReset=true");
            } else {
                if ($_SESSION['facility'] == 'LMC-ADMIN') {
                    header("Location: ../public/admin.php");
                } else {
                    header("Location: ../public/eventContainers.php");
                }
            }
            exit;
        } else {
            $_SESSION['login_error_msg'] = "Invalid Email or Password";
            header("Location: ../public/index.php");
            exit;
        }
    } else {
        $_SESSION['login_error_msg'] = "Invalid Email or Password";
        header("Location: ../public/index.php");
        exit;
    }
    // Close database connection
    $query->close();
    $mysqli->close();

} else {
    header("Location: ../public/index.php");
}
