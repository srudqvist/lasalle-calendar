<?php

// Make sure request is of the right type
//var_dump($_SERVER["REQUEST_METHOD"]);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = htmlspecialchars($_POST["email"]);
    $password = htmlspecialchars($_POST["password"]);

    // Todo: 
    // * Handle invalid inputs before querying the db.
    // * 

    echo "Email: ";
    echo "<br>";
    echo $email;
    echo "<br>";
    echo "Password: ";
    echo "<br>";
    echo $password;

    header("Location: ../index.php");
} else {
    header("Location: ../index.php");
}
