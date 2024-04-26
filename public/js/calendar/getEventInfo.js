/**
 * Event Information Retrieval
 *
 * This JavaScript file handles the retrieval of event information.
 * It imports the formatAMPM function from the formatAMPM.js file.
 * Upon the DOMContentLoaded event, it invokes the getEventInfo function to fetch event data from the server.
 * The getEventInfo function is defined as an asynchronous function that extracts the containerId from the URL parameters.
 * It sends a GET request to get_event_info.php with the containerId and processes the response data.
 * It formats the available days and times, meeting type, duration, notes, and time zone.
 * The formatted data is then displayed on the page.
 * Error handling is implemented to catch any errors that occur during the process.
 *
 * External Dependencies:
 * - formatAMPM.js: Provides the formatAMPM function for formatting time.
 *
 * Functions:
 * - getEventInfo(): Fetches event information from the server.
 *
 */

import { formatAMPM } from "../utils/formatAMPM.js";

document.addEventListener("DOMContentLoaded", () => {
  // Make a request to PHP to get data from the database
  getEventInfo();

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
    const startTime = data.start_time;
    const endTime = data.end_time;

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let startDayIndex = daysOfWeek.indexOf(data.start_day);
    let endDayIndex = daysOfWeek.indexOf(data.end_day);

    // Handle the case where end day comes before start day
    if (endDayIndex < startDayIndex) {
      endDayIndex += 7;
    }

    const availableDays = daysOfWeek.slice(startDayIndex, endDayIndex + 1); // Extract available days
    let availableDaysContent;

    if (startDayIndex == endDayIndex) {
      availableDaysContent = `${data.start_day} ${formatAMPM(startTime)} - ${formatAMPM(endTime)}`;
    } else {
      availableDaysContent = `${data.start_day} - ${data.end_day} ${formatAMPM(startTime)} - ${formatAMPM(endTime)}`;
    }

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
      fetchedAvailableDays: availableDays,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};
export { getEventInfo };
