/**
 * Scheduled Meeting Form Submission
 *
 * This JavaScript file handles the submission of a scheduled meeting form.
 * It listens for the DOMContentLoaded event and attaches a submit event listener to the scheduleMeetingForm element.
 * When the form is submitted, it prevents the default form submission behavior and gathers form data.
 * The containerId is retrieved from the URL parameters, and the date and time are extracted from the form.
 * The form data is then sent via a POST request to save_scheduled_meeting.php using the Fetch API.
 * Upon successful submission, the user is redirected to meetingConfirmation.php.
 * If an error occurs during submission, appropriate error messages are logged to the console.
 *
 * Functions:
 * - splitDateTime(dateTimeString): Parses date and time strings, converts time to 24-hour format, and formats date and time strings.
 * - fetchUserInformation(): Fetches user information from the server.
 * - saveEdits(data): Saves edited user information to the server.
 * - changePasswordRequest(currentPassword, newPassword): Sends a request to change the user's password to the server.
 *
 */

document.addEventListener("DOMContentLoaded", function () {
  const scheduleForm = document.getElementById("scheduleMeetingForm");
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Send event container id to be able to get the facility and event name
    const urlParams = new URLSearchParams(window.location.search);
    const containerId = urlParams.get("containerId");

    const dateTimeString = document.getElementById("date-time").innerText;
    const { date, time } = splitDateTime(dateTimeString);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const timeZone = document.getElementById("timezone").innerText;
    const comments = event.target.comments.value;

    const formData = new FormData();

    formData.append("containerId", containerId);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("timezone", timeZone);
    formData.append("comments", comments);

    //todo: refactor this to match other fetch when making changes here
    fetch("../../../includes/save_scheduled_meeting.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "meetingConfirmation.php";
        } else {
          console.error("Error Scheduling a Meeting:", response.statusText);
        }
      })
      .catch((error) => {
        console.error(
          "There Was an Error Scheduling a Meeting:",
          error.message,
        );
      });
  });
});

function splitDateTime(dateTimeString) {
  if (typeof dateTimeString !== "string") {
    throw new Error("Input is not a string");
  }

  // Split the date and time parts
  const parts = dateTimeString.split(" ");
  // Extract time (first part)
  const timeString = parts.shift();
  // Extract AM/PM
  const period = parts.shift();
  // Split hours and minutes
  const [hour, minute] = timeString.split(":").map(Number);

  // Convert to 24-hour format
  let hour24 = hour;
  if (period === "PM" && hour !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour === 12) {
    hour24 = 0;
  }

  // Rejoin date parts
  const date = parts.join(" ");

  // Create Date object for time
  const timeObj = new Date();
  timeObj.setHours(hour24);
  timeObj.setMinutes(minute);
  timeObj.setSeconds(0);

  const timeStringFormatted = timeObj.toLocaleTimeString("en-US", {
    hour12: false,
  });

  // Parse Date object for date
  const [month, day, year] = date.split(" ");
  const dateObj = new Date(`${month} ${day}, ${year}`);

  // Format date as YYYY-MM-DD
  const formattedDate = dateObj.toISOString().split("T")[0];

  return { time: timeStringFormatted, date: formattedDate };
}
