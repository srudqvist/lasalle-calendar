document.addEventListener("DOMContentLoaded", () => {
  const editUserInformationButton = document.getElementById("editButton");
  const userInformationDiv = document.getElementById("userInformationDiv");

  if (userInformationDiv) {
    displayUserInformation(userInformationDiv);
  } else {
    console.log("There was an error accessing the userInformationDiv");
  }

  if (editUserInformationButton) {
    editUserInformationButton.addEventListener("click", () => {
      if (userInformationDiv) {
        displayEditUserInformation(userInformationDiv);
      } else {
        console.log("There was an error displaying the edit user information.");
      }
    });
  }
});

async function displayUserInformation(currentDiv) {
  try {
    const userData = await fetchUserInformation();

    if (!userData) {
      console.log("No user data available");
      return;
    }

    console.log(`Data: ${userData.user_id}`);
  } catch (error) {
    console.log(`Error fetching the user information: ${error}`);
  }
}

function displayEditUserInformation(currentDiv) {
  console.log(currentDiv);
  const primaryEmailSpan = currentDiv.querySelector("#primaryEmail");
  let primaryEmail;
  if (primaryEmailSpan) {
    primaryEmail = primaryEmailSpan.textContent;
    console.log(primaryEmail);
    const primaryEmailInputField = createInputField(primaryEmail, "email");
    primaryEmailSpan.parentNode.replaceChild(
      primaryEmailInputField,
      primaryEmailSpan,
    );
    currentDiv.appendChild(displayButtons());
  } else {
    const parent = currentDiv.parentNode;
    parent.insertBefore(displayErrorMessage(), parent.firstChild);
    console.log("No primary email element");
  }
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
    hideEditElements();
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

function displayErrorMessage() {
  const errorMessage = document.createElement("p");
  errorMessage.innerText = "Something Went Wrong";
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
