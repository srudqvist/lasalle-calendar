/**
 * User Management
 *
 * This JavaScript file handles the management of user data, including displaying user information, changing user facility, and updating user status.
 * It makes asynchronous requests to fetch user data, change user facility, and update user status.
 * User data is displayed in a table format, with options to change facility and update user status.
 *
 * External Dependencies:
 * - getUsers.js: JavaScript file for fetching user data.
 * - changeFacility.js: JavaScript file for changing user facility.
 * - updateUserStatus.js: JavaScript file for updating user status.
 *
 * Functions:
 * - displayUsers(users): Displays user information in a table format with options to change facility and update user status.
 *
 */

import { changeFacility } from "./changeFacility.js";
import { getUsers } from "./getUsers.js";
import { updateUserStatus } from "./updateUserStatus.js";

const facilities = [
  "Limestone",
  "Winnfield",
  "San Luis",
  "Facility 1",
  "Facility 2",
  "Facility 3",
  "LMC-ADMIN",
];

document.addEventListener("DOMContentLoaded", async () => {
  const users = await getUsers();

  if (users["success"] === true) {
    displayUsers(users["users"]);
  } else {
    // display error message
    console.log(`Users: ${users}`);
    console.log("Could not get users");
  }
});

function displayUsers(users) {
  const table = document.getElementById("innerTable");
  for (let i = 0; i < users.length; i++) {
    const row = document.createElement("tr");

    for (let [key, value] of Object.entries(users[i])) {
      const cell = document.createElement("td");

      if (key == "user_id") {
        continue;
      }

      if (key == "isActive") {
        if (value == 1) {
          value = "Active";
        } else if (value == 0) {
          value = "Inactive";
        }
      }

      if (key.includes("email")) {
        cell.classList.add("email-column");
        const aTag = document.createElement("a");
        aTag.href = `mailto:${value}`;
        aTag.textContent = value;
        cell.appendChild(aTag);
      } else if (key == "facility") {
        const dropdown = document.createElement("select");

        for (let i = 0; i < facilities.length; i++) {
          const option = document.createElement("option");
          option.value = facilities[i];
          option.text = facilities[i];
          dropdown.appendChild(option);

          if (option.value == value) {
            option.selected = true;
          }
        }
        dropdown.classList.add("dropdown");

        dropdown.addEventListener("change", () => {
          changeFacility(dropdown.value, users[i].user_id);
        });

        cell.classList.add("column");

        cell.appendChild(dropdown);
      } else {
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
