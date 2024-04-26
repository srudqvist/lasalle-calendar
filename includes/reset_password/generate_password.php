<?php
/**
 * Generate Random Password
 *
 * This function generates a random password of the specified length with a mix of uppercase letters, lowercase letters,
 * numbers, and symbols.
 *
 * @param int $length The length of the password (default is 12)
 * @return string The generated random password
 */

function generateRandomPassword($length = 12)
{
    // Define the character sets for each type of character
    $uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $lowercase = 'abcdefghijklmnopqrstuvwxyz';
    $numbers = '0123456789';
    $symbols = '!@#$%^&*()-_=+';

    // Initialize the password variable
    $password = '';

    // Generate random characters from each character set
    $password .= substr(str_shuffle($uppercase), 0, 2); // At least 2 uppercase letters
    $password .= substr(str_shuffle($lowercase), 0, 2); // At least 2 lowercase letters
    $password .= substr(str_shuffle($numbers), 0, 2);   // At least 2 numbers
    $password .= substr(str_shuffle($symbols), 0, 2);   // At least 2 symbols

    // Fill the remaining length with random characters
    $remainingLength = $length - strlen($password);
    $password .= substr(str_shuffle($uppercase . $lowercase . $numbers . $symbols), 0, $remainingLength);

    // Shuffle the password to ensure randomness
    $password = str_shuffle($password);

    return $password;
}
