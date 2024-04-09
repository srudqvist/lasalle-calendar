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
  const table = document.getElementById("innerTable");
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);

    const row = document.createElement("tr");

    for (let [key, value] of Object.entries(users[i])) {
      console.log(`Key: ${key}, Value: ${value}`);
      const cell = document.createElement("td");

      if (key == "isActive") {
        if (value == 1) {
          value = "Active";
        } else if (value == 2) {
          value = "Inactive";
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
    if (users[i].hasOwnProperty("isActive") && users[i]["isActive"] == 1) {
      button.classList.add("cancel-button");
      button.textContent = "Inactivate";
      console.log("active user");
    } else {
      button.classList.add("activate-user-button");
      button.textContent = "Activate";
    }
    buttonTd.appendChild(button);
    row.appendChild(buttonTd);

    table.appendChild(row);

    //   <table id="outerTable">
    //     <tr><th id="tableHeader">Scheduled Meetings</th></tr>
    //     <tr><td class="center_content"><br><table id="innerTable">
    //       <tr>
    //         <th class="green-background"><f1>Last Name</f1></th>
    //         <th class="green-background"><f1>First Name</f1></th>
    //         <th class="green-background"><f1>Primary Email</f1></th>
    //         <th class="green-background"><f1>Secondary Email</f1></th>
    //         <th class="green-background"><f1>Phone</f1></th>
    //         <th class="green-background"><f1>Active</f1></th>
    //         <th class="green-background"><f1>Notes</f1></th>
    //         <th class="green-background"><f1>Cancel</f1></th>
    //       </tr>
    //
    //
    //     <tr id='meeting{$row['meeting_id']}'>
    //     <td class='date-column'>{$row['meeting_date']}</td>
    //     <td class='time-column'>{$row['meeting_time']}</td>
    //     <td class='eventTitle-column'>{$row['event_name']}</td>
    //     <td class='name-column'>{$row['name']}</td>
    //     <td class='phone-column'>{$row['phone']}</td>
    //     <td class='email-column'><a href='mailto:{$row['email']}'>{$row['email']}</a></td>
    //     <td class='notes-column'><td1>{$row['notes']}</td1></td>
    //     <td class='cancel-column'><button class='cancel-button' >Cancel</button></td>
    //     </tr>
    //
    //
    // </table><br></td></tr></table></div>
  }
}
