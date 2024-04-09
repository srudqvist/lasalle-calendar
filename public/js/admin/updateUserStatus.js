// get the users and return them in json
async function updateUserStatus(userStatusToChangeTo, userId) {
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
      console.log("Bad response");
      throw new Error(`HTTP ERROR! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData["success"] === false) {
      return { success: false };
    }

    return {
      success: true,
      users: responseData["message"],
    };
  } catch {
    console.log("Could not upate user");
    return { success: false };
  }
}

export { updateUserStatus };
