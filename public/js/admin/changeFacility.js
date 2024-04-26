/**
 * Facility Changer
 *
 * This JavaScript function changes the facility for a user and returns the updated user data in JSON format.
 * It sends an asynchronous request to the server to update the facility information.
 * The function handles HTTP errors and returns a success flag along with the updated user data if the request is successful.
 *
 * External Dependencies:
 * - change_facility.php: PHP script for changing the facility information.
 *
 * Functions:
 * - changeFacility(newFacility, userId): Changes the facility for a user and returns the updated user data in JSON format.
 *
 */

// get the users and return them in json
async function changeFacility(newFacility, userId) {
  const url = "../../../includes/admin/change_facility.php";

  const requestData = {
    userId: userId,
    facility: newFacility,
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
      showAlert("Error", "Could not update facility");
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

export { changeFacility };
