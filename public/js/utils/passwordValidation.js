/**
 * Password Validation Function
 *
 * This JavaScript file provides a function for validating passwords based on certain criteria.
 * The function checks if a password meets the following requirements:
 * - At least 8 characters long
 * - Contains at least one lowercase letter
 * - Contains at least one uppercase letter
 * - Contains at least one digit
 * - Contains at least one special character from the set [@=$!%*?&]
 *
 * Note: this only provides client side validation
 *
 * Function:
 * - isPasswordValid(password): Validates whether a password meets the specified criteria.
 *   - Parameters:
 *     - password: The password string to be validated.
 *   - Returns:
 *     - true if the password meets all criteria, false otherwise.
 *
 * Exported Functions:
 * - isPasswordValid: Function for validating passwords.
 */

function isPasswordValid(password) {
  if (password.length > 0) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@=$!%*?&])[A-Za-z\d@=$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  } else {
    return false;
  }
}

export { isPasswordValid };
