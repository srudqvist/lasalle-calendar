import { getUsers } from "./getUsers.js";
import { updateUserStatus } from "./updateUserStatus.js";

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
  const table = document.getElementById("innerTable");
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);

    const row = document.createElement("tr");

    for (let [key, value] of Object.entries(users[i])) {
      console.log(`Key: ${key}, Value: ${value}`);
      const cell = document.createElement("td");

      if (key == "user_id") {
        continue;
      }

      if (key == "isActive") {
        if (value == 1) {
          value = "Inactivate";
        } else if (value == 0) {
          value = "Activate";
        }
      }

      if (key.includes("email")) {
        cell.classList.add("email-column");
        const aTag = document.createElement("a");
        aTag.href = `mailto:${value}`;
        aTag.textContent = value;
        cell.appendChild(aTag);
      } else {
        // give different class to email
        cell.classList.add("column");
        cell.textContent = value;
      }

      row.appendChild(cell);
    }

    const buttonTd = document.createElement("td");
    const button = document.createElement("button");
    const userId = users[i].user_id;

    if (users[i].hasOwnProperty("isActive") && users[i]["isActive"] == 1) {
      button.classList.add("cancel-button");
      button.textContent = "Inactivate";
      button.addEventListener("click", () => {
        updateUserStatus(0, userId);
      });
      console.log("active user");
    } else {
      button.classList.add("activate-user-button");
      button.addEventListener("click", () => {
        updateUserStatus(1, userId);
      });
      button.textContent = "Activate";
    }

    buttonTd.appendChild(button);
    row.appendChild(buttonTd);

    table.appendChild(row);
  }
}
