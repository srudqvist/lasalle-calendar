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
