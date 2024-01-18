document.addEventListener("DOMContentLoaded", () => {
	// <span id="availableDays"></span>
	// <span id="meetingType"></span>
	// <span id="meetingDuration"></span>
	// <span id="meetingNotes"></span>
	const availableDaysContent = "Monday - Friday 8:00am - 5:00pm";
	const meetingTypeContent = "Zoom";
	const meetingDurationContent = "1h, 30 min";
	const meetingNotesContent = "Some notes about the meeting.";

	// const availableDays = document.getElementById("availableDays");
	// const meetingType = document.getElementById("meetingType");
	// const meetingDuration = document.getElementById("meetingDuration");
	// const meetingNotes = document.getElementById("meetingNotes");

	// availableDays = availableDaysContent;
	// meetingType = meetingTypeContent;
	// meetingDuration = meetingDurationContent;
	// meetingNotes = meetingNotesContent;

	document.getElementById("availableDays").textContent = availableDaysContent;
	document.getElementById("meetingType").textContent = meetingTypeContent;
	document.getElementById("meetingDuration").textContent =
		meetingDurationContent;
	document.getElementById("meetingNotes").textContent = meetingNotesContent;
});
