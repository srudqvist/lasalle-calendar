import { formatAMPM } from "../utils/formatAMPM.js";
document.addEventListener("DOMContentLoaded", () => {
  // Make a request to PHP to get data from the database
  getEventInfo();
  // dateTimeContent is the selected date
  const dateTimeContent = "No date or time selected";
  document.getElementById("date-time").textContent = dateTimeContent;
});

const getEventInfo = async () => {
  try {
    // Extract containerId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const containerId = urlParams.get("containerId");

    const response = await fetch(
      "../../../includes/get_event_info.php?containerId=" + containerId,
    );
    const data = await response.json();
    // Handle the data retrieved from PHP
    console.log(data);

    const startTime = data.start_time;
    const endTime = data.end_time;

    //const availableDaysContent = data.start_day + " - " data.end_day + " "
    const availableDaysContent = `${data.start_day} - ${data.end_day} ${formatAMPM(startTime)} - ${formatAMPM(endTime)}`;
    const meetingTypeContent = data.meeting_type;
    const meetingDurationContent = data.duration;
    const meetingNotesContent = data.description;
    const timeZoneContent = data.time_zone;

    document.getElementById("availableDays").textContent = availableDaysContent;
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
    document.getElementById("meetingNotes2").textContent = meetingNotesContent;
    document.getElementById("calendarTimezone").innerHTML =
      `<p>Time Zone: ${timeZoneContent}</p>`;
    return {
      fetchedStartTime: startTime,
      fetchedEndTime: endTime,
      fetchedDuration: meetingDurationContent,
    };
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};
export { getEventInfo };
