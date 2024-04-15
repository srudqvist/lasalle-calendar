// get the users and return them in json
async function changeFacility(newFacility, userId) {
  console.log("running updateUserStatus");
  const url = "../../../includes/admin/change_facility.php";

  const requestData = {
    userId: userId,
    userStatus: newFacility,
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
      showAlert("Error", "Could not update facility");
      return { success: false };
    }

    location.reload();

    return {
      success: true,
      users: responseData["message"],
    };
  } catch {
    console.log("Could not upate facility");
    return { success: false };
  }
}

export { changeFacility };
