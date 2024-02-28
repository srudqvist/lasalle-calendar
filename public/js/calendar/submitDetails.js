document.addEventListener("DOMContentLoaded", function () {
  const scheduleForm = document.getElementById("scheduleMeetingForm");
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // const dateTime = event.target.date.value;
    // Send event container id to be able to get the facility and event name
    const urlParams = new URLSearchParams(window.location.search);
    const containerId = urlParams.get("containerId");

    const dateTimeString = document.getElementById("date-time").innerText;
    const { date, time } = splitDateTime(dateTimeString);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const timeZone = document.getElementById("timezone").innerText;
    const comments = event.target.comments.value;

    console.log(
      `Timezone: ${timeZone} Name: ${name}, email: ${email} comments: ${comments}`,
    );
    console.log(`Date: ${date}, Time: ${time}`);
  });
});

function splitDateTime(dateTimeString) {
  // Check if dateTimeString is a string
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

  // Format hour and minute as two digits
  const hourFormatted = hour24.toString().padStart(2, "0");
  const minuteFormatted = minute.toString().padStart(2, "0");

  // Reconstruct the time in 24-hour format
  const time = `${hourFormatted}:${minuteFormatted}`;

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
