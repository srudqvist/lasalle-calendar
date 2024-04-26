/**
 * User Status Updater
 *
 * This JavaScript function updates the status of a user by sending a request to the server.
 * It receives the new user status and the user ID as parameters and makes an asynchronous request to update the status.
 * The function handles HTTP errors and displays an error message if the status update fails.
 * Upon successful status update, it reloads the page to reflect the changes.
 *
 * External Dependencies:
 * - switch_user_status.php: PHP script handling user status updates on the server.
 *
 * Functions:
 * - updateUserStatus(userStatusToChangeTo, userId): Updates the status of a user and returns the updated user list in JSON format.
 *
 */

// get the users and return them in json
async function updateUserStatus(userStatusToChangeTo, userId) {
  console.log("running updateUserStatus");
  const url = "../../../includes/admin/switch_user_status.php";

  const requestData = {
    userId: userId,
    userStatus: userStatusToChangeTo,
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
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData["success"] === false) {
      showAlert("Error", "Could not update user status");
      return { success: false };
    }

    location.reload();

    return {
      success: true,
      users: responseData["message"],
    };
  } catch {
    return { success: false };
  }
}

export { updateUserStatus };
