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
