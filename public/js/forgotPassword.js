document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("resetButton");
  const resetForm = document.getElementsByTagName("form");

  resetForm[0].addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Resetting Password");
    const email = event.target.email.value;

    if (email) {
      const resetPassword = await resetPasswordRequest(email);
    } else {
      console.log("No email");
    }
  });
});

/**
 * Sends a password reset request to the server.
 * @param {string} email - The email address of the user.
 *
 * */
async function resetPasswordRequest(email) {
  console.log("sending password reset request to server");
  const url = "../../includes/reset_password/reset_password.php";
  const requestData = {
    email: email,
  };
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
    return false;
  } else {
    return true;
  }
}
