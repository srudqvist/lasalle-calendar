document.addEventListener("DOMContentLoaded", () => {
  // Extract containerId from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const containerId = urlParams.get("containerId");

  // Make a request to PHP to get data from the database
  fetch("../../../includes/get_event_info.php?containerId=" + containerId)
    .then((response) => response.json())
    .then((data) => {
      // Handle the data retrieved from PHP
      console.log(data);

      //const availableDaysContent = data.start_day + " - " data.end_day + " "
      const availableDaysContent = `${data.start_day} - ${data.end_day} ${data.start_time} - ${data.end_time}`;
      const meetingTypeContent = data.meeting_type;
      const meetingDurationContent = data.duration;
      const meetingNotesContent = data.description;
      const timeZoneContent = data.time_zone;

      document.getElementById("availableDays").textContent =
        availableDaysContent;
      document.getElementById("meetingType").textContent = meetingTypeContent;
      document.getElementById("meetingDuration").textContent =
        meetingDurationContent;
      document.getElementById("meetingNotes").textContent = meetingNotesContent;

      // Data for "second" page
      document.getElementById("timezone").innerHTML = timeZoneContent;

      document.getElementById("availableDays2").textContent =
        availableDaysContent;
      document.getElementById("meetingType2").textContent = meetingTypeContent;
      document.getElementById("meetingDuration2").textContent =
        meetingDurationContent;
      document.getElementById("meetingNotes2").textContent =
        meetingNotesContent;
      document.getElementById("calendarTimezone").innerHTML =
        `<p>Time Zone: ${timeZoneContent}</p>`;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });

  const availableDaysContent = "Monday - Friday 8:00am - 5:00pm";
  const meetingTypeContent = "Zoom";
  const meetingDurationContent = "1h, 30 min";
  const meetingNotesContent = "Some notes about the meeting.";

  // dateTimeContent is the selected date
  const dateTimeContent = "No date or time selected";
  //const timeZoneContent = "Central Time (US & Canada)";

  // document.getElementById("availableDays").textContent = availableDaysContent;
  // document.getElementById("meetingType").textContent = meetingTypeContent;
  // document.getElementById("meetingDuration").textContent =
  //   meetingDurationContent;
  // document.getElementById("meetingNotes").textContent = meetingNotesContent;
  document.getElementById("date-time").textContent = dateTimeContent;
  // document.getElementById("timezone").innerHTML = timeZoneContent;
  //
  // document.getElementById("availableDays2").textContent = availableDaysContent;
  // document.getElementById("meetingType2").textContent = meetingTypeContent;
  // document.getElementById("meetingDuration2").textContent =
  //   meetingDurationContent;
  // document.getElementById("meetingNotes2").textContent = meetingNotesContent;
});
