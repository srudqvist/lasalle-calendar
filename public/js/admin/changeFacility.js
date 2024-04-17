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
