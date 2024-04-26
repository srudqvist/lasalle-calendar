/**
 * Password Reset Request
 *
 * This JavaScript file handles the submission of a password reset request form.
 * It listens for the submission of the form and prevents the default form submission behavior.
 * Upon form submission, it retrieves the email input value, sends a password reset request to the server asynchronously,
 * and logs the outcome of the request.
 * If the request is successful, it returns true; otherwise, it returns false.
 *
 * Functions:
 * - resetPasswordRequest(email): Sends a password reset request to the server.
 */

document.addEventListener("DOMContentLoaded", () => {
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
