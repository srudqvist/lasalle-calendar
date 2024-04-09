import { getUsers } from "./getUsers.js";
document.addEventListener("DOMContentLoaded", async () => {
  const users = await getUsers();

  if (users["success"] === true) {
    // display the users
    console.log("Got users");
    displayUsers(users["users"]);
  } else {
    // display error message
    console.log(`Users: ${users}`);
    console.log("Could not get users");
  }
});

function displayUsers(users) {
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
  }
}
