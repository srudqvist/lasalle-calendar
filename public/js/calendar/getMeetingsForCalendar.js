/**
 * Scheduled Meetings Retrieval
 *
 * This JavaScript file handles the retrieval of scheduled meetings by date.
 * It imports the formatAMPM function from the formatAMPM.js file.
 * The getScheduledMeetingsByDate function is defined as an asynchronous function that takes a date parameter.
 * It extracts the containerId from the URL parameters and constructs a request object with containerId and date.
 * Using the Fetch API, it sends a POST request to get_scheduled_calendar.php with the request data.
 * Upon receiving a response, it checks if the response is successful and handles the data accordingly.
 * If the response indicates success, it maps each meeting object to apply the formatAMPM function to the meeting's time.
 * Error handling is implemented to catch any errors that occur during the process.
 *
 * External Dependencies:
 * - formatAMPM.js: Provides the formatAMPM function for formatting time.
 *
 * Functions:
 * - getScheduledMeetingsByDate(date): Retrieves scheduled meetings for a specific date.
 *
 */

import { formatAMPM } from "../utils/formatAMPM.js";

const getScheduledMeetingsByDate = async (date) => {
  try {
    // Extract containerId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const containerId = urlParams.get("containerId").toString();

    const requestData = {
      containerId: containerId,
      date: date,
    };

    const response = await fetch(
      "../../../includes/get_scheduled_calendar.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data["success"] === false) {
      return [];
    }
    return data.map((meeting) => formatAMPM(meeting));

    // Handle the response data as needed
  } catch (error) {
    // Handle errors
    console.log(`Error in getScheduledMeetingsByDate: ${error}`);
    return [];
  }
};

export { getScheduledMeetingsByDate };
