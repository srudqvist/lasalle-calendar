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
    console.log(requestData);
    console.log(JSON.stringify(requestData));
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
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.map((meeting) => formatAMPM(meeting));

    // Handle the response data as needed
  } catch (error) {
    // Handle errors
    console.log(`Error in getScheduledMeetingsByDate: ${error}`);
    return [];
  }
};

export { getScheduledMeetingsByDate };
