/**
 * Signup Form Validation and Submission
 *
 * This JavaScript file handles the validation and submission of a signup form.
 * It includes functions for validating input fields such as first name, last name, phone number, and password.
 * Additionally, it ensures that the password meets complexity requirements and matches the confirmation password.
 * Upon successful validation, the form data is submitted asynchronously to a backend endpoint for processing.
 * It also provides functionality for displaying error messages and a countdown timer for redirection upon successful submission.
 *
 * Note: this is only front end validation.
 *
 * Functions:
 * - nameValidation(name): Validates the format of a name input.
 * - phoneValidation(phoneNumber): Validates the format of a phone number input.
 * - showErrorMessage(message, inputName, errorDiv): Displays an error message for a specific input field.
 * - removeErrorMessage(message, inputName, errorDiv): Removes an error message associated with a specific input field.
 * - submitSignupForm(requestData): Asynchronously submits the signup form data to the backend.
 * - updateCountdown(targetTime): Updates and displays a countdown timer for redirection.
 */

import { isPasswordValid } from "./utils/passwordValidation.js";
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const firstNameInput = document.getElementById("firstName");
  const firstNameErrorDiv = document.getElementById("firstNameError");
  const lastNameInput = document.getElementById("lastName");
  const lastNameErrorDiv = document.getElementById("lastNameError");
  const passwordErrorDiv = document.getElementById("passwordError");
  const confirmPasswordErrorDiv = document.getElementById("confirmError");
  const phoneInput = document.getElementById("phone");

  if (signupForm) {
    if (firstNameInput) {
      firstNameInput.addEventListener("input", function (event) {
        let currentValidation = nameValidation(event.target.value);
        const errorMessage = "Name input failed validation";

        if (!currentValidation) {
          showErrorMessage(errorMessage, firstNameInput, firstNameErrorDiv);
        } else if (
          document.getElementById(firstNameErrorDiv.id + errorMessage)
        ) {
          removeErrorMessage(errorMessage, firstNameInput, firstNameErrorDiv);
        }
      });
    }

    if (lastNameInput) {
      lastNameInput.addEventListener("input", function (event) {
        let currentValidation = nameValidation(event.target.value);
        const errorMessage = "Name input failed validation";

        if (!currentValidation) {
          showErrorMessage(errorMessage, lastNameInput, lastNameErrorDiv);
        } else if (
          document.getElementById(lastNameErrorDiv.id + errorMessage)
        ) {
          removeErrorMessage(errorMessage, lastNameInput, lastNameErrorDiv);
        }
      });
    }

    if (phoneInput) {
      // Handle the phone number format as the user is typing.
      phoneInput.addEventListener("input", function (event) {
        const isBackspace = event.inputType === "deleteContentBackward";

        if (!isBackspace) {
          let inputValue = event.target.value.replace(/\D/g, "");

          if (inputValue.length > 0) {
            inputValue =
              "(" + inputValue.substring(0, 3) + ") " + inputValue.substring(3);
          }

          if (inputValue.length > 8) {
            inputValue =
              inputValue.substring(0, 9) + "-" + inputValue.substring(9);
          }

          if (inputValue.length > 14) {
            inputValue = inputValue.substring(0, 14);
          }
          event.target.value = inputValue;
        } else {
          let inputValue = event.target.value;
          const lastChar = inputValue.charAt(inputValue.length - 1);

          if (lastChar === ")" || lastChar === "-") {
            inputValue = inputValue.substring(0, inputValue.length - 1);
          }
          event.target.value = inputValue;
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("input", function (event) {
        const errorMessage = "Password not meeting complexity requirements";

        if (!isPasswordValid(event.target.value)) {
          showErrorMessage(errorMessage, passwordInput, passwordErrorDiv);
        } else if (
          document.getElementById(passwordErrorDiv.id + errorMessage)
        ) {
          removeErrorMessage(errorMessage, passwordInput, passwordErrorDiv);
        }
      });
    }

    if (passwordInput && confirmPasswordInput) {
      confirmPasswordInput.addEventListener("input", function (event) {
        const errorMessage = "Passwords do not match";

        if (passwordInput.value !== event.target.value) {
          showErrorMessage(
            errorMessage,
            confirmPasswordInput,
            confirmPasswordErrorDiv,
          );
        } else if (
          document.getElementById(confirmPasswordErrorDiv.id + errorMessage)
        ) {
          removeErrorMessage(
            errorMessage,
            confirmPasswordInput,
            confirmPasswordErrorDiv,
          );
        }
      });
    }

    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (
        nameValidation(firstNameInput.value) &&
        nameValidation(lastNameInput.value) &&
        phoneValidation(phoneInput.value) &&
        isPasswordValid(password) &&
        password === confirmPassword
      ) {
        const formData = {
          facility: event.target.facility.value,
          firstName: event.target.firstName.value,
          lastName: event.target.lastName.value,
          phone: event.target.phone.value,
          email: event.target.email.value,
          password: event.target.password.value,
          confirmPassword: event.target.confirmPassword.value,
        };

        const responseMessage = submitSignupForm(formData);

        if (responseMessage) {
        }
      } else {
        // ? Display bigger error message?
      }
    });
  }

  //Add password requirements text, show on hover, hide otherwise.
  const tooltip = document.querySelector(".password-tooltip");
  tooltip.addEventListener("mouseenter", function () {
    const tooltipText = document.createElement("span");
    tooltipText.textContent =
      "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.I";
    tooltipText.classList.add("tooltiptext");
    this.appendChild(tooltipText);
  });

  tooltip.addEventListener("mouseleave", function () {
    const tooltipText = document.querySelector(".tooltiptext");
    this.removeChild(tooltipText);
  });

  function nameValidation(name) {
    // Regex allowing letters, spaces, hyphens, and apostrophes
    if (name.length > 0) {
      const nameRegex = /^[A-Za-z]+(?:[-' ]?[A-Za-z]+)*$/;
      const validName = nameRegex.test(name);
      return validName;
    } else {
      return true;
    }
  }

  function phoneValidation(phoneNumber) {
    if (phoneNumber.length != 14) {
      return false;
    }
    return true;
  }

  function showErrorMessage(message, inputName, errorDiv) {
    const errorAlreadyExists = document.getElementById(errorDiv.id + message);

    if (!errorAlreadyExists) {
      let errorMessagesDiv = errorDiv;
      const errorMessage = document.createElement("span");

      inputName.classList.add("input-error-red-border");
      inputName.style.outline = "2px solid red";

      errorDiv.classList.add("password-no-match");

      errorMessage.id = errorDiv.id + message;
      errorMessage.textContent = message;
      errorMessage.classList.add("red_text");

      errorMessagesDiv.appendChild(errorMessage);
    }
  }

  function removeErrorMessage(message, inputName, errorDiv) {
    const errorToRemove = document.getElementById(errorDiv.id + message);
    inputName.style.outline = "";
    inputName.classList.remove("input-error-red-border");
    errorToRemove.remove();
  }
});

async function submitSignupForm(requestData) {
  try {
    const url = "../../includes/signup.php";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      if (data["success"] === true) {
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";

        var targetTime = new Date().getTime() + 3000;
        updateCountdown(targetTime);
      }

      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Function to update the countdown
function updateCountdown(targetTime) {
  var intervalId;
  var intervalId = setInterval(function () {
    var now = new Date().getTime();
    var timeDifference = targetTime - now;

    var seconds = Math.ceil(timeDifference / 1000);

    // Display the remaining time on the page
    document.getElementById("redirectText").textContent =
      "Redirecting in " + seconds + " seconds";

    // If time difference is less than or equal to 0, stop updating the countdown and perform the redirection
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      window.location.replace("index.php");
    }
  }, 1000);
}
