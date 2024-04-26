/**
 * User Fetcher
 *
 * This JavaScript function fetches user data from the server and returns it in JSON format.
 * It sends an asynchronous request to the server to retrieve user information.
 * The function handles HTTP errors and returns a success flag along with the user data if the request is successful.
 *
 * External Dependencies:
 * - get_users.php: PHP script for retrieving user data from the server.
 *
 * Functions:
 * - getUsers(): Fetches user data and returns it in JSON format.
 *
 */

// get the users and return them in json
async function getUsers() {
  const url = "../../../includes/admin/get_users.php";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData["success"] === false) {
      return { success: false };
    }

    return {
      success: true,
      users: responseData["users"],
    };
  } catch {
    return { success: false };
  }
}

export { getUsers };
