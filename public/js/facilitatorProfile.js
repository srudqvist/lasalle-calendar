document.addEventListener("DOMContentLoaded", async () => {
  let originalUserDetailsDiv; // Variable to store the original state of userInformationDiv
  const editUserInformationButton = document.getElementById("editButton");
  const userInformationDiv = document.getElementById("userInformationDiv");
  const resetPasswordButton = document.getElementById("resetPasswordButton");
  const userData = await fetchUserInformation();
  let editDisabled = false;
  let editing = false;

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

  if (resetPasswordButton) {
    resetPasswordButton.addEventListener("click", () => {
      console.log("Reset Password Clicked");
      // Todo: implement reset password functionality
    });
  }

  function restoreUserInformationDiv() {
    console.log("Restoring userInformationDiv");
    const userDetailsDiv = document.getElementById("userDetailsDiv");
    const buttonDiv = document.getElementById("buttonDiv");
    const parent = userDetailsDiv.parentNode;
    parent.replaceChild(originalUserDetailsDiv.cloneNode(true), userDetailsDiv); // Restore userInformationDiv to its original state
    if (buttonDiv) {
      parent.removeChild(buttonDiv);
    }
  }

  function displayUserInformation(userData) {
    try {
      if (!userData) {
        console.log("No user data available");
        // Todo: display an error message
        return;
      }

      const contentDiv = document.getElementById("contentDiv");
      const primaryEmailSpan = document.getElementById("primaryEmail");
      const secondaryEmailSpan = document.getElementById("secondaryEmail");
      const facilitySpan = document.getElementById("facility");
      const phoneSpan = document.getElementById("phone");

      const resetPasswordButton = document.createElement("button");
      resetPasswordButton.innerText = "Reset Password";

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
    console.log(currentDiv);
    const primaryEmailSpan = currentDiv.querySelector("#primaryEmail");
    const secondaryEmailSpan = currentDiv.querySelector("#secondaryEmail");
    const phoneSpan = currentDiv.querySelector("#phone");

    let primaryEmail;
    let secondaryEmail;
    let phone;

    if (primaryEmailSpan) {
      primaryEmail = primaryEmailSpan.textContent;
      console.log(primaryEmail);
      const primaryEmailInputField = createInputField(primaryEmail, "email");
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
      secondaryEmailSpan.parentNode.replaceChild(
        secondaryEmailInputField,
        secondaryEmailSpan,
      );
    }

    if (phoneSpan) {
      phone = phoneSpan.textContent;
      console.log(phoneSpan);
      const phoneInputField = createInputField(phone, "tel");
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

  function hideEditElements() {
    const buttonDiv = document.getElementById("buttonDiv");
    buttonDiv.parentNode.removeChild(buttonDiv);
  }

  function createInputField(text, inputType) {
    const inputField = document.createElement("input");
    inputField.type = inputType;
    inputField.value = text;
    inputField.classList.add("generic-input");
    return inputField;
  }

  function createButtons() {
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
    });

    buttons.push(cancelButton);
    buttons.push(saveButton);
    return buttons;
  }

  function displayButtons() {
    const buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttonDiv");
    buttonDiv.style.display = "flex";
    buttonDiv.style.justifyContent = "space-between";

    const buttons = createButtons();

    for (const button of buttons) {
      buttonDiv.appendChild(button);
    }

    return buttonDiv;
  }

  function displayErrorMessage(message) {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = message;
    const errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv");
    errorDiv.appendChild(errorMessage);

    return errorDiv;
  }
});

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
