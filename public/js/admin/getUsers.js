// get the users and return them in json
async function getUsers() {
  const url = "";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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
    console.log("Could not get users");
    return { success: false };
  }
}

export { getUsers };
