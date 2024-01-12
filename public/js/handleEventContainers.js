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

	addEventButton.addEventListener("click", () => {
		//createEventContainer(`Event ${containerIndex}`, containerIndex);
		console.log("Add event button clicked");
		openAddEventContainerModal();
	});
	eventContainerModalForm.addEventListener("submit", (event) => {
		event.preventDefault();
		console.log("Submit button clicked");
		const eventColor = event.target.eventColor.value;
		const eventStartDay = event.target.dayFrom.value;
		const eventStopDay = event.target.dayTo.value;
		const eventStartTime = event.target.startTime.value;
		const eventEndTime = event.target.endTime.value;
		const eventMeetingType = event.target.meetingType.value;

		// TODO:
		// Do some validation, i.e. set the text color of the event container
		// based on the color that was picked for the event container color.

		const eventName = event.target.eventName.value;
		createEventContainer(
			eventName,
			eventColor,
			eventStartDay,
			eventStartTime,
			eventStopDay,
			eventEndTime,
			eventMeetingType,
			containerIndex
		);
		closeAddEventContainerModal();
		containerIndex++;
	});
	// Add check to see if the container was created before incrementing the index

	const createEventContainer = (
		headlineText,
		eventColor,
		eventStartDay,
		eventStartTime,
		eventStopDay,
		eventEndTime,
		eventMeetingType,
		containerIndex
	) => {
		const container = document.createElement("div");
		const buttonDiv = document.createElement("div");
		buttonDiv.classList.add("button-div");
		container.classList.add("eventContainer");
		container.style.backgroundColor = eventColor;

		const headline = document.createElement("h2");
		const headlineColor = getContrastColor(eventColor);
		headline.textContent = headlineText;
		headline.style.color = headlineColor;
		container.appendChild(headline);

		const from = eventStartDay + " " + eventStartTime;
		const to = eventStopDay + " " + eventEndTime;
		const dayTimeRangeText = from + " - " + to;
		console.log(from + " - " + to);

		const dayTimeRange = document.createElement("h4");
		dayTimeRange.textContent = dayTimeRangeText;
		dayTimeRange.style.color = headlineColor;
		container.appendChild(dayTimeRange);

		const meetingType = document.createElement("h4");
		meetingType.textContent = "Meeting By: " + eventMeetingType;
		meetingType.style.color = headlineColor;
		container.appendChild(meetingType);

		const viewCalendarButton = document.createElement("button");
		viewCalendarButton.id = "viewCalendarButton" + containerIndex;
		viewCalendarButton.textContent = "View Calendar";
		// applyButtonStyles(viewCalendarButton);
		viewCalendarButton.addEventListener("click", (event) => {
			handleButtonClick(event, "View Calendar", containerIndex);
		});
		// container.appendChild(viewCalendarButton);
		buttonDiv.appendChild(viewCalendarButton);

		const copyLinkButton = document.createElement("button");
		copyLinkButton.id = "copyLinkButton" + containerIndex;
		copyLinkButton.textContent = "Copy Link";
		// applyButtonStyles(copyLinkButton);
		copyLinkButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Copy Link", containerIndex);
		});
		// container.appendChild(copyLinkButton);
		buttonDiv.appendChild(copyLinkButton);

		const editButton = document.createElement("button");
		editButton.id = "editButton" + containerIndex;
		editButton.textContent = "Edit";
		// applyButtonStyles(editButton);
		editButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Edit", containerIndex);
		});
		// container.appendChild(editButton);
		buttonDiv.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.id = "deleteButton" + containerIndex;
		deleteButton.textContent = "Delete";
		// applyButtonStyles(deleteButton);
		deleteButton.style.setProperty("--event-color-darker", "#ff0000");
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

	const deleteEventContainer = (containerNumber) => {
		eventContainerToDelete = document.getElementById(containerNumber);
		eventContainersDiv.removeChild(eventContainerToDelete);
	};

	const openAddEventContainerModal = () => {
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
	// const applyButtonStyles = (button) => {
	// 	button.style.padding = "10px 20px";
	// 	button.style.backgroundColor = "#4CAF50"; /* Green background color */
	// 	button.style.color = "white";
	// 	button.style.border = "none";
	// 	button.style.borderRadius = "5px";
	// 	button.style.cursor = "pointer";
	// 	button.style.fontSize = "16px";
	// 	button.style.transition = "background-color 0.3s ease";
	// 	// button.style.margin = "0px 10px 10px 0px";

	// 	// Hover effect
	// 	button.addEventListener("mouseover", () => {
	// 		button.style.backgroundColor =
	// 			"#45a049"; /* Darker green on hover */
	// 	});

	// 	button.addEventListener("mouseout", () => {
	// 		button.style.backgroundColor =
	// 			"#4CAF50"; /* Restore original color on mouseout */
	// 	});
	// };

	window.addEventListener("click", function (event) {
		if (event.target === addEventContainerModal) {
			addEventContainerModal.style.display = "none";
		}
	});
	document.querySelector(".close").addEventListener("click", () => {
		closeAddEventContainerModal();
	});
});
