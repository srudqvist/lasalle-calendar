document.addEventListener("DOMContentLoaded", () => {
	// <span id="availableDays"></span>
	// <span id="meetingType"></span>
	// <span id="meetingDuration"></span>
	// <span id="meetingNotes"></span>
	const availableDaysContent = "Monday - Friday 8:00am - 5:00pm";
	const meetingTypeContent = "Zoom";
	const meetingDurationContent = "1h, 30 min";
	const meetingNotesContent = "Some notes about the meeting.";

	const dateTimeContent = "9:00 am - 10:00 am, March 16, 2024";
	const timeZoneContent = "Central Time (US & Canada)";

	// const availableDays = document.getElementById("availableDays");
	// const meetingType = document.getElementById("meetingType");
	// const meetingDuration = document.getElementById("meetingDuration");
	// const meetingNotes = document.getElementById("meetingNotes");

	// availableDays = availableDaysContent;
	// meetingType = meetingTypeContent;
	// meetingDuration = meetingDurationContent;
	// meetingNotes = meetingNotesContent;

	// const nextButton = document.getElementById("nextButton");
	// nextButton.addEventListener("click", () => {
	// 	document.getElementById("date-time").textContent = dateTimeContent;
	// 	document.getElementById("timezone").innerHTML = timeZoneContent;
	// });

	document.getElementById("availableDays").textContent = availableDaysContent;
	document.getElementById("meetingType").textContent = meetingTypeContent;
	document.getElementById("meetingDuration").textContent =
		meetingDurationContent;
	document.getElementById("meetingNotes").textContent = meetingNotesContent;
	document.getElementById("date-time").textContent = dateTimeContent;
	document.getElementById("timezone").innerHTML = timeZoneContent;

	document.getElementById("availableDays2").textContent =
		availableDaysContent;
	document.getElementById("meetingType2").textContent = meetingTypeContent;
	document.getElementById("meetingDuration2").textContent =
		meetingDurationContent;
	document.getElementById("meetingNotes2").textContent = meetingNotesContent;
});
