<?php
echo "hello0";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $facility = htmlspecialchars($_POST["facility"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $password = htmlspecialchars($_POST["password"]);
    $confirmPassword = htmlspecialchars($_POST["confirmPassword"]);

    echo "Facility: ";
    echo "<br>";
    echo $facility;
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
