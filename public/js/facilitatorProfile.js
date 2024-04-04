import { scaleUpElement, resetScaleElement } from "./utils/scaleElements.js";
import { isPasswordValid } from "./utils/passwordValidation.js";
document.addEventListener("DOMContentLoaded", async () => {
  let originalUserDetailsDiv; // Variable to store the original state of userInformationDiv
  const editUserInformationButton = document.getElementById("editButton");
  const userInformationDiv = document.getElementById("userInformationDiv");
  const changePasswordButton = document.getElementById("changePasswordButton");
  const userData = await fetchUserInformation();
  let editDisabled = false;
  let editing = false;

  changePasswordButton.addEventListener("mouseover", () =>
    scaleUpElement(changePasswordButton),
  );

  changePasswordButton.addEventListener("mouseleave", () =>
    resetScaleElement(changePasswordButton),
  );

  if (userInformationDiv) {
    displayUserInformation(userData);
    const userDetailsDiv = document.getElementById("userDetailsDiv");
    originalUserDetailsDiv = userDetailsDiv.cloneNode(true); // Clone the original userInformationDiv
  } else {
    console.log("There was an error accessing the userInformationDiv");
  }

  if (editUserInformationButton) {
    editUserInformationButton.addEventListener("click", () => {
      if (userInformationDiv && !editing && !editDisabled) {
        editing = true;
        displayEditUserInformation(userInformationDiv);
      } else {
        console.log("There was an error displaying the edit user information.");
      }
    });
  } else {
    console.log("No edit button");
  }

  if (changePasswordButton) {
    changePasswordButton.addEventListener("click", () => {
      console.log("Change Password Clicked");
      // Todo: implement reset password functionality
      displayChangePassword();
    });
  }

  function restoreUserInformationDiv() {
    console.log("Restoring userInformationDiv");
    const userDetailsDiv = document.getElementById("userDetailsDiv");
    const buttonDiv = document.getElementById("buttonDiv");
    const passwordDiv = document.getElementById("passwordDiv");
    const parent = userDetailsDiv.parentNode;

    if (buttonDiv && !passwordDiv) {
      parent.removeChild(buttonDiv);
    } else if (passwordDiv) {
      userDetailsDiv.removeChild(passwordDiv);
    }

    parent.replaceChild(originalUserDetailsDiv.cloneNode(true), userDetailsDiv); // Restore userInformationDiv to its original state
    let changePasswordButton = document.getElementById("changePasswordButton");
    console.log(changePasswordButton);
    changePasswordButton.addEventListener("click", () => {
      console.log("Change Password Clicked");
      // Todo: implement reset password functionality
      displayChangePassword();
    });
    changePasswordButton.addEventListener("mouseover", () =>
      scaleUpElement(changePasswordButton),
    );

    changePasswordButton.addEventListener("mouseleave", () =>
      resetScaleElement(changePasswordButton),
    );
    console.log(changePasswordButton);
  }

  function displayUserInformation(userData) {
    try {
      if (!userData) {
        console.log("No user data available");
        // Todo: display an error message
        return;
      }

      const contentDiv = document.getElementById("contentDiv");
      const firstNameSpan = document.getElementById("firstName");
      const lastNameSpan = document.getElementById("lastName");
      const primaryEmailSpan = document.getElementById("primaryEmail");
      const secondaryEmailSpan = document.getElementById("secondaryEmail");
      const facilitySpan = document.getElementById("facility");
      const phoneSpan = document.getElementById("phone");
      // const resetPasswordButton = document.createElement("button");
      // resetPasswordButton.innerText = "Reset Password";

      if (userData.first_name) {
        firstNameSpan.innerText = userData.first_name;
      }

      if (userData.last_name) {
        lastNameSpan.innerText = userData.last_name;
      }

      if (userData.email) {
        if (userData.email.length < 3) {
          editDisabled = true;
          contentDiv.insertBefore(
            displayErrorMessage(
              "Primary Email value incorrect, Please contact your systems administrator",
            ),
            contentDiv.firstChild,
          );
        } else {
          primaryEmailSpan.innerText = userData.email;
        }
      } else {
        editDisabled = true;
        contentDiv.insertBefore(
          displayErrorMessage(
            "Primary Email missing, Please contact your systems administrator",
          ),
          contentDiv.firstChild,
        );
        primaryEmailSpan.innerText = "This should never happen";
      }

      if (userData.secondary_email) {
        secondaryEmailSpan.innerText = userData.secondary_email;
      } else {
        secondaryEmailSpan.innerText = "Add a secondary email";
      }

      if (userData.facility) {
        if (userData.facility.lenght < 2) {
          editDisabled = true;
          contentDiv.insertBefore(
            displayErrorMessage(
              "Incorrect facility value, Please contact your systems administrator",
            ),
            contentDiv.firstChild,
          );
        } else {
          facilitySpan.innerText = userData.facility;
        }
      } else {
        editDisabled = true;
        contentDiv.insertBefore(
          displayErrorMessage(
            "Facility missing, Please contact your systems administrator",
          ),
          contentDiv.firstChild,
        );
        facilitySpan.innerText =
          "Facility information missing, please contact your administrator";
      }

      if (userData.phone) {
        phoneSpan.innerText = userData.phone;
      } else {
        phoneSpan.innerText = "This should never happen";
      }
    } catch (error) {
      console.log(`Error fetching the user information: ${error}`);
    }
  }

  function displayEditUserInformation(currentDiv) {
    const firstNameSpan = currentDiv.querySelector("#firstName");
    const lastNameSpan = currentDiv.querySelector("#lastName");
    const primaryEmailSpan = currentDiv.querySelector("#primaryEmail");
    const secondaryEmailSpan = currentDiv.querySelector("#secondaryEmail");
    const phoneSpan = currentDiv.querySelector("#phone");
    const passwordDiv = currentDiv.querySelector("#passwordDiv");
    passwordDiv.parentNode.removeChild(passwordDiv);

    let firstName;
    let lastName;
    let primaryEmail;
    let secondaryEmail;
    let phone;

    if (firstNameSpan) {
      firstName = firstNameSpan.textContent;
      const firstNameInputField = createInputField(firstName, "text");
      firstNameInputField.id = "firstName";
      firstNameInputField.required = true;
      firstNameSpan.parentNode.replaceChild(firstNameInputField, firstNameSpan);
    } else {
      const parent = currentDiv.parentNode;
      parent.insertBefore(
        displayErrorMessage(
          "First Name missing, Please contact your systems administrator",
        ),
        parent.firstChild,
      );
      console.log("No first name element");
    }

    if (lastNameSpan) {
      lastName = lastNameSpan.textContent;
      console.log(lastName);
      const lastNameInputField = createInputField(lastName, "text");
      lastNameInputField.id = "lastName";
      lastNameInputField.required = true;
      lastNameSpan.parentNode.replaceChild(lastNameInputField, lastNameSpan);
    } else {
      const parent = currentDiv.parentNode;
      parent.insertBefore(
        displayErrorMessage(
          "Last Name missing, Please contact your systems administrator",
        ),
        parent.firstChild,
      );
      console.log("No last name element");
    }

    if (primaryEmailSpan) {
      primaryEmail = primaryEmailSpan.textContent;
      console.log(primaryEmail);
      const primaryEmailInputField = createInputField(primaryEmail, "email");
      primaryEmailInputField.id = "primaryEmail";
      primaryEmailInputField.required = true;
      primaryEmailSpan.parentNode.replaceChild(
        primaryEmailInputField,
        primaryEmailSpan,
      );
    } else {
      const parent = currentDiv.parentNode;
      parent.insertBefore(
        displayErrorMessage(
          "Primary Email missing, Please contact your systems administrator",
        ),
        parent.firstChild,
      );
      console.log("No primary email element");
    }

    if (secondaryEmailSpan) {
      secondaryEmail = secondaryEmailSpan.textContent;
      if (secondaryEmail.startsWith("Add ")) {
        secondaryEmail = "";
      }
      const secondaryEmailInputField = createInputField(
        secondaryEmail,
        "email",
      );
      secondaryEmailInputField.id = "secondaryEmail";
      secondaryEmailSpan.parentNode.replaceChild(
        secondaryEmailInputField,
        secondaryEmailSpan,
      );
    }

    if (phoneSpan) {
      phone = phoneSpan.textContent;
      console.log(phoneSpan);
      const phoneInputField = createInputField(phone, "tel");
      phoneInputField.id = "phone";
      phoneInputField.required = true;
      phoneInputField.addEventListener("input", function (event) {
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
        }
      });

      phoneSpan.parentNode.replaceChild(phoneInputField, phoneSpan);
    } else {
      const parent = currentDiv.parentNode;
      parent.insertBefore(
        displayErrorMessage(
          "Phone Number missing, Please contact your systems administrator",
        ),
        parent.firstChild,
      );
      console.log("Phone number missing");
    }
    currentDiv.appendChild(displayButtons());
  }

  function displayChangePassword() {
    let currentPassword = "";
    let newPassword = "";
    let confirmNewPassword = "";

    const passwordDiv = document.getElementById("passwordDiv");
    let changePasswordButton = document.getElementById("changePasswordButton");
    const currPassLabel = createLabel("Current Password:");
    const currPassInput = createInputField(currentPassword, "password");
    const newPassLabel = createLabel("New Password");
    const newPasswordInput = createInputField(newPassword, "password");
    const confirmNewLabel = createLabel("Confirm New Password");
    const confirmNewPasswordInput = createInputField(
      confirmNewPassword,
      "password",
    );

    currPassLabel.classList.add("appear-transition");
    currPassInput.classList.add("appear-transition");
    currPassInput.setAttribute("id", "currPass");
    passwordDiv.appendChild(currPassLabel);
    passwordDiv.appendChild(currPassInput);

    newPassLabel.classList.add("appear-transition");
    newPasswordInput.classList.add("appear-transition");
    newPasswordInput.setAttribute("id", "newPass");
    passwordDiv.appendChild(newPassLabel);
    passwordDiv.appendChild(newPasswordInput);

    confirmNewLabel.classList.add("appear-transition");
    confirmNewPasswordInput.classList.add("appear-transition");
    confirmNewPasswordInput.setAttribute("id", "confirmPass");
    passwordDiv.appendChild(confirmNewLabel);
    passwordDiv.appendChild(confirmNewPasswordInput);

    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttonDiv");
    buttonDiv.style.display = "flex";
    buttonDiv.style.justifyContent = "space-between";

    const buttons = createButtons(false);

    for (const button of buttons) {
      button.addEventListener("mouseover", () => scaleUpElement(button));
      button.addEventListener("mouseleave", () => resetScaleElement(button));
      buttonDiv.appendChild(button);
    }
    passwordDiv.appendChild(buttonDiv);

    passwordDiv.removeChild(changePasswordButton);
    // Apply the transition effect after a short delay to trigger the animation
    setTimeout(() => {
      currPassLabel.style.opacity = 1;
      currPassInput.style.opacity = 1;
      newPassLabel.style.opacity = 1;
      newPasswordInput.style.opacity = 1;
      confirmNewLabel.style.opacity = 1;
      confirmNewPasswordInput.style.opacity = 1;
    }, 1); // Adjust the delay time as needed
  }

  function hideEditElements() {
    const buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.parentNode.removeChild(buttonDiv);
  }

  function createLabel(text) {
    const label = document.createElement("label");
    label.textContent = text;
    //label.classList.add()
    return label;
  }

  function createInputField(text, inputType) {
    const inputField = document.createElement("input");
    inputField.type = inputType;
    inputField.value = text;
    inputField.classList.add("generic-input");
    return inputField;
  }

  function createButtons(edit = true) {
    const buttons = [];
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.classList.add("cancel-button");

    cancelButton.addEventListener("click", () => {
      editing = false;
      restoreUserInformationDiv();
      console.log("Cancel Button Clicked");
    });

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.classList.add("save-button");

    saveButton.addEventListener("click", () => {
      console.log("Save Button Clicked");

      if (edit) {
        if (validateInputs()) {
          const inputData = getInputData();
          saveEdits(inputData);
        } else {
          console.log("Validation Failed");
        }
      } else {
        console.log("save reset password clicked");
        // todo:
        // compare new password and confirm new password
        const contentDiv = document.getElementById("contentDiv");
        const currentPassword = document.getElementById("currPass").value;
        const newPassword = document.getElementById("newPass").value;
        const confirmPassword = document.getElementById("confirmPass").value;

        const contentChildren = Array.from(contentDiv.children);
        const errorDivs = contentChildren.filter(
          (child) => child.id === "errorDiv",
        );

        for (let i = 0; i < errorDivs.length; i++) {
          contentDiv.removeChild(errorDivs[i]);
        }

        if (currentPassword === newPassword) {
          console.log("STOP! Current password is the same as new");
          //todo: display error message
          const contentDiv = document.getElementById("contentDiv");
          contentDiv.insertBefore(
            displayErrorMessage("New password can not be the same as old."),
            contentDiv.firstChild,
          );
        } else {
          const passwordsMatch = comparePasswords(newPassword, confirmPassword);

          if (passwordsMatch) {
            // send the current password and the new to the server

            changePasswordRequest(currentPassword, newPassword);
          } else {
            console.log("passwords did not match, do something");
            const contentDiv = document.getElementById("contentDiv");
            contentDiv.insertBefore(
              displayErrorMessage("Passwords did not match"),
              contentDiv.firstChild,
            );
          }
        }
      }
    });

    buttons.push(cancelButton);
    buttons.push(saveButton);
    return buttons;
  }

  function comparePasswords(newPassword, confirmPassword) {
    console.log(newPassword);
    console.log(confirmPassword);
    if (isPasswordValid(newPassword) && newPassword === confirmPassword) {
      console.log("PASS MATCH");
      return true;
    }
    return false;
  }

  function displayButtons() {
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttonDiv");
    buttonDiv.style.display = "flex";
    buttonDiv.style.justifyContent = "space-between";

    const buttons = createButtons();

    for (const button of buttons) {
      button.addEventListener("mouseover", () => scaleUpElement(button));
      button.addEventListener("mouseleave", () => resetScaleElement(button));
      buttonDiv.appendChild(button);
    }

    return buttonDiv;
  }

  function validateInputs() {
    const primaryEmailInput = document.querySelector("#primaryEmail");
    console.log(primaryEmailInput);
    const phoneInput = document.querySelector("#phone");

    // Validate primary email
    if (primaryEmailInput && !validateEmail(primaryEmailInput.value)) {
      return false;
    }

    // Validate phone number
    if (phoneInput && !validatePhoneNumber(phoneInput.value)) {
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhoneNumber(phone) {
    // Phone number validation logic
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
  }

  function getInputData() {
    const firstNameInput = document.querySelector("#firstName");
    const lastNameInput = document.querySelector("#lastName");
    const primaryEmailInput = document.querySelector("#primaryEmail");
    const secondaryEmailInput = document.querySelector("#secondaryEmail");
    const phoneInput = document.querySelector("#phone");

    console.log(primaryEmailInput.value);

    return {
      firstName: firstNameInput ? firstNameInput.value : "",
      lastName: lastNameInput ? lastNameInput.value : "",
      primaryEmail: primaryEmailInput ? primaryEmailInput.value : "",
      secondaryEmail: secondaryEmailInput ? secondaryEmailInput.value : "",
      phone: phoneInput ? phoneInput.value : "",
    };
  }
});

function displayErrorMessage(message) {
  const errorMessage = document.createElement("p");
  errorMessage.innerText = message;
  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("id", "errorDiv");
  errorDiv.appendChild(errorMessage);

  return errorDiv;
}

async function fetchUserInformation() {
  // Todo: fetch the user information.
  try {
    const requestData = {};
    const url = "../../../includes/get_profile_info.php";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data["success"] === false) {
      return null;
    }

    // Return the user data
    return data["data"];

    // Handle the response data as needed
  } catch (error) {
    // Handle errors
    console.log(`Error in facilitatorProfile: ${error}`);
    return [];
  }
}

async function saveEdits(data) {
  console.log(`Data: ${JSON.stringify(data)}`);
  const requestData = data;

  if (!requestData) {
    const contentDiv = document.getElementById("contentDiv");
    contentDiv.insertBefore(
      displayErrorMessage(
        "Something Went Wrong, Please contact your systems administrator.",
      ),
      contentDiv.firstChild,
    );
    return null;
  }

  try {
    const url = "../../includes/facilitator_profile/save_user_info.php";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      console.log("Response NOT OK");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData["success"] === false) {
      return null;
    }

    // Return the user data
    console.log(responseData);
    return responseData["message"];
  } catch (error) {
    console.log(error);
  }
}

async function changePasswordRequest(currentPassword, newPassword) {
  console.log(`Password: ${currentPassword}, New Password: ${newPassword}`);
  const url = "../../includes/facilitator_profile/change_password.php";
  const requestData = {
    newPassword: newPassword,
    currentPassword: currentPassword,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      console.log("Response NOT OK");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData["success"] === false) {
      return null;
    }

    // Return the user data
    console.log(responseData);
    return responseData["message"];
  } catch (error) {
    console.log(error);
  }
}
