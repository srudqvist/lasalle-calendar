<?php

function isValidName($name)
{
    // Name should not be empty and should consist of letters, spaces, or hyphens
    return !empty($name) && preg_match('/^[a-zA-Z\s-]+$/', $name);
}

function isValidEmail($email)
{
    // Use PHP's built-in filter_var function to validate email format
    return !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isValidPhone($phone)
{
    // Phone should not be empty and should consist of digits and optional parentheses, spaces, hyphens
    return !empty($phone) && preg_match('/^[\d\s()-]+$/', $phone);
}

function isValidPassword($password)
{
    // Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character,
    // and be at least 8 characters long
    $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=@$!%*?&])[A-Za-z\d@=$!%*?&]{8,}$/';
    return !empty($password) && preg_match($passwordRegex, $password);
}
