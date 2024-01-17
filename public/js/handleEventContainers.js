document.addEventListener("DOMContentLoaded", () => {
	const addEventButton = document.getElementById("addEventContainer");
	const eventContainersDiv = document.getElementById("eventContainers");
	const addEventContainerModal = document.getElementById(
		"eventContainerModal"
	);
	const eventContainerModalForm = document.getElementById(
		"eventContainerModalForm"
	);

	// const colorSwatches = document.querySelectorAll(".color-swatch");
	// colorSwatches.forEach((swatch) => {
	// 	swatch.addEventListener("click", () => {
	// 		colorSwatches.forEach((otherSwatch) => {
	// 			otherSwatch.classList.remove("selected");
	// 		});
	// 	swatch.classList.add("selected");
	// 	});

	// })
	// get container index from db when page loads
	let containerIndex = 1;
	let editing = false;
	let editContainerIndex = 0;

	addEventButton.addEventListener("click", () => {
		//createEventContainer(`Event ${containerIndex}`, containerIndex);
		openAddEventContainerModal("Create New Container");
	});
	eventContainerModalForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const eventColor = event.target.eventColor.value;
		const eventStartDay = event.target.dayFrom.value;
		const eventStopDay = event.target.dayTo.value;
		const eventStartTime = event.target.startTime.value;
		const eventEndTime = event.target.endTime.value;
		const eventTimeZone = event.target.timeZone.value;
		const eventMeetingType = event.target.meetingType.value;
		const eventDescription = event.target.description.value;

		// TODO:
		// Do some validation, i.e. set the text color of the event container
		// based on the color that was picked for the event container color.

		const eventName = event.target.eventName.value;
		if (!editing) {
			createEventContainer(
				eventName,
				eventColor,
				eventStartDay,
				eventStartTime,
				eventStopDay,
				eventEndTime,
				eventTimeZone,
				eventMeetingType,
				eventDescription,
				containerIndex
			);
			closeAddEventContainerModal();
			containerIndex++;
		} else if (editing) {
			// Edit the current event container.
			editEventContainer(
				eventName,
				eventColor,
				eventStartDay,
				eventStartTime,
				eventStopDay,
				eventEndTime,
				eventTimeZone,
				eventMeetingType,
				eventDescription,
				editContainerIndex
			);
			editing = false;
			closeAddEventContainerModal();
		}
	});
	// Add check to see if the container was created before incrementing the index

	const createEventContainer = (
		headlineText,
		eventColor,
		eventStartDay,
		eventStartTime,
		eventStopDay,
		eventEndTime,
		eventTimeZone,
		eventMeetingType,
		eventDescription,
		containerIndex
	) => {
		const container = document.createElement("div");
		const buttonDiv = document.createElement("div");
		const buttonColor = makeColorBrighter(eventColor);

		buttonDiv.classList.add("button-div");
		container.classList.add("eventContainer");
		// container.style.borderColor = eventColor;
		// container.style.backgroundColor = eventColor;
		container.style.setProperty("--event-color", eventColor);

		const headline = document.createElement("h2");
		const headlineColor = getContrastColor(eventColor);
		headline.textContent = headlineText;
		headline.classList.add("event-headline");
		// headline.style.color = headlineColor;
		container.appendChild(headline);

		const dayRangeText = eventStartDay + " - " + eventStopDay;
		const dayRange = document.createElement("h4");
		dayRange.textContent = dayRangeText;
		dayRange.classList.add("day-range");
		// dayTimeRange.style.color = headlineColor;
		container.appendChild(dayRange);

		const timeRangeText = eventStartTime + " - " + eventEndTime;
		const timeRange = document.createElement("h4");
		timeRange.textContent = timeRangeText;
		timeRange.classList.add("time-range");
		// dayTimeRange.style.color = headlineColor;
		container.appendChild(timeRange);

		const timeZone = document.createElement("h4");
		timeZone.textContent = eventTimeZone;
		timeZone.classList.add("time-zone");
		container.appendChild(timeZone);

		const meetingType = document.createElement("h4");
		meetingType.textContent = "Meeting By: " + eventMeetingType;
		meetingType.classList.add("meeting-type");
		// meetingType.style.color = headlineColor;
		container.appendChild(meetingType);

		const description = document.createElement("p");
		description.id = "description" + containerIndex;
		description.textContent = eventDescription;
		// description.style.visibility = "hidden";
		description.style.display = "none";
		container.appendChild(description);

		const viewCalendarButton = document.createElement("button");
		viewCalendarButton.id = "viewCalendarButton" + containerIndex;
		viewCalendarButton.textContent = "View Calendar";
		viewCalendarButton.style.setProperty(
			"--event-color-darker",
			buttonColor
		);
		// viewCalendarButton.style.setProperty(
		// 	"--event-text-color",
		// 	headlineColor
		// );
		// applyButtonStyles(viewCalendarButton);
		viewCalendarButton.addEventListener("click", (event) => {
			handleButtonClick(event, "View Calendar", containerIndex);
		});
		// container.appendChild(viewCalendarButton);
		buttonDiv.appendChild(viewCalendarButton);

		const copyLinkButton = document.createElement("button");
		copyLinkButton.id = "copyLinkButton" + containerIndex;
		copyLinkButton.textContent = "Copy Link";
		copyLinkButton.style.setProperty("--event-color-darker", buttonColor);
		// copyLinkButton.style.setProperty("--event-text-color", headlineColor);
		// applyButtonStyles(copyLinkButton);
		copyLinkButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Copy Link", containerIndex);
		});
		// container.appendChild(copyLinkButton);
		buttonDiv.appendChild(copyLinkButton);

		const editButton = document.createElement("button");
		editButton.id = "editButton" + containerIndex;
		editButton.textContent = "Edit";
		editButton.style.setProperty("--event-color-darker", buttonColor);
		// editButton.style.setProperty("--event-text-color", headlineColor);
		// applyButtonStyles(editButton);
		editButton.addEventListener("click", (event) => {
			// handleButtonClick(event, "Edit", containerIndex);
			getContainerValues(containerIndex);
		});
		// container.appendChild(editButton);
		buttonDiv.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.id = "deleteButton" + containerIndex;
		deleteButton.textContent = "Delete";
		// applyButtonStyles(deleteButton);
		deleteButton.style.setProperty("--event-color-darker", buttonColor);
		// deleteButton.style.setProperty("--event-text-color", headlineColor);
		deleteButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Delete", containerIndex);
			deleteEventContainer(containerIndex);
		});
		// container.appendChild(deleteButton);
		buttonDiv.appendChild(deleteButton);

		container.id = containerIndex;
		container.appendChild(buttonDiv);

		eventContainersDiv.appendChild(container);
	};

	const getContainerValues = (containerNumber) => {
		const eventContainerToEdit = document.getElementById(containerNumber);
		const headline =
			eventContainerToEdit.getElementsByClassName("event-headline")[0]
				.innerHTML;
		const dayRange =
			eventContainerToEdit.getElementsByClassName("day-range")[0]
				.innerHTML;
		const [startDay, endDay] = dayRange.split(" - ");
		const timeRange =
			eventContainerToEdit.getElementsByClassName("time-range")[0]
				.innerHTML;
		const [startTime, endTime] = timeRange.split(" - ");
		const timeZone =
			eventContainerToEdit.getElementsByClassName("time-zone")[0]
				.innerHTML;
		const meetingType = eventContainerToEdit
			.getElementsByClassName("meeting-type")[0]
			.innerHTML.split(": ")[1];
		const description = document.getElementById(
			"description" + containerNumber
		).textContent;

		const eventColor = eventContainerToEdit.style.cssText.split(": ")[1];
		console.log(eventColor);

		let formHeadline = document.getElementById("eventName");

		const formStartDay = document.getElementById("dayFrom");
		const formEndDay = document.getElementById("dayTo");
		const formStartTime = document.getElementById("startTime");
		const formEndTime = document.getElementById("endTime");
		const formTimeZone = document.getElementById("timeZone");
		const formMeetingType = document.getElementById("meetingType");
		const formDescription = document.getElementById("description");
		const formEventColor = document.getElementById("eventColorPicker");
		formHeadline.value = headline;
		formStartDay.value = startDay;
		formEndDay.value = endDay;
		formStartTime.value = startTime;
		formEndTime.value = endTime;
		formTimeZone.value = timeZone;
		formMeetingType.value = meetingType;
		formDescription.value = description;
		formEventColor.value = eventColor;
		editing = true;
		editContainerIndex = containerNumber;
		openAddEventContainerModal("Edit Event Container");
		// console.log(
		// 	`Headline: ${headline[0].innerHTML}\nDay-Time Range: ${
		// 		dayTimeRange[0].innerHTML
		// 	}\nMeeting Type: ${meetingType[0].innerHTML}\n`
		// );

		// console.log(headline.item(0).innerHTML);
	};

	const editEventContainer = (
		eventHeadlineText,
		eventColor,
		eventStartDay,
		eventStartTime,
		eventStopDay,
		eventEndTime,
		eventTimeZone,
		eventMeetingType,
		eventDescription,
		containerNumber
	) => {
		const eventContainerToEdit = document.getElementById(containerNumber);
		const headline =
			eventContainerToEdit.getElementsByClassName("event-headline")[0];
		const dayRange =
			eventContainerToEdit.getElementsByClassName("day-range")[0];
		const timeRange =
			eventContainerToEdit.getElementsByClassName("time-range")[0];
		const timeZone =
			eventContainerToEdit.getElementsByClassName("time-zone")[0];
		const meetingType =
			eventContainerToEdit.getElementsByClassName("meeting-type")[0];
		const description = document.getElementById(
			"description" + containerNumber
		);
		// const color = eventContainerToEdit.style.cssText;
		// console.log(color);
		headline.innerHTML = eventHeadlineText;
		dayRange.innerHTML = eventStartDay + " - " + eventStopDay;
		timeRange.innerHTML = eventStartTime + " - " + eventEndTime;
		timeZone.innerHTML = eventTimeZone;
		meetingType.innerHTML = "Meeting By: " + eventMeetingType;
		description.innerHTML = eventDescription;
		eventContainerToEdit.style.cssText = "--event-color: " + eventColor;
	};

	const deleteEventContainer = (containerNumber) => {
		const eventContainerToDelete = document.getElementById(containerNumber);
		eventContainersDiv.removeChild(eventContainerToDelete);
	};

	const openAddEventContainerModal = (submitButtonText) => {
		document.getElementById("submitButton").innerHTML = submitButtonText;
		addEventContainerModal.style.display = "block";
	};
	const closeAddEventContainerModal = () => {
		eventContainerModalForm.reset();
		addEventContainerModal.style.display = "none";
	};

	const handleButtonClick = (event, buttonText, containerNumber) => {
		const container = event.target.closest(".event-container");
		console.log(
			`${buttonText} button on  container ${containerNumber} clicked.`
		);
	};

	const getContrastColor = (hexColor) => {
		// Convert hex color to RGB
		const r = parseInt(hexColor.slice(1, 3), 16);
		const g = parseInt(hexColor.slice(3, 5), 16);
		const b = parseInt(hexColor.slice(5, 7), 16);

		// Calculate relative luminance using the formula for sRGB
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		// Choose white or black based on luminance
		return luminance > 0.5 ? "#000000" : "#ffffff";
	};
	const makeColorBrighter = (eventColor) => {
		// Get the color value from the input
		const hex = eventColor.replace(/^#/, "");
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		// Brighten the color (you can adjust the brightness factor)
		const brightnessFactor = 2;
		const brighterR = Math.min(Math.floor(r * brightnessFactor), 255);
		const brighterG = Math.min(Math.floor(g * brightnessFactor), 255);
		const brighterB = Math.min(Math.floor(b * brightnessFactor), 255);

		// Convert back to hex
		const brighterHex = `#${(
			(1 << 24) |
			(brighterR << 16) |
			(brighterG << 8) |
			brighterB
		)
			.toString(16)
			.slice(1)}`;

		return brighterHex;
	};

	window.addEventListener("click", function (event) {
		if (event.target === addEventContainerModal) {
			addEventContainerModal.style.display = "none";
		}
	});
	document.querySelector(".close").addEventListener("click", () => {
		closeAddEventContainerModal();
	});
});
