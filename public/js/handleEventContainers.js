document.addEventListener("DOMContentLoaded", () => {
	const addEventButton = document.getElementById("addEventContainer");
	const eventContainersDiv = document.getElementById("eventContainers");
	const addEventContainerModal = document.getElementById(
		"eventContainerModal"
	);

	const colorSwatches = document.querySelectorAll(".color-swatch");
	colorSwatches.forEach((swatch) => {
		swatch.addEventListener("click", () => {
			colorSwatches.forEach((otherSwatch) => {
				otherSwatch.classList.remove("selected");
			});
		swatch.classList.add("selected");
		});

	})
	// get container index from db when page loads
	let containerIndex = 1;

	addEventButton.addEventListener("click", () => {
		//createEventContainer(`Event ${containerIndex}`, containerIndex);
		openAddEventContainerModal();
		// Add check to see if the container was created before incrementing the index
		containerIndex++;
	});

	const createEventContainer = (headlineText, containerIndex) => {
		const container = document.createElement("div");
		container.classList.add("eventContainer");

		const headline = document.createElement("h2");
		headline.textContent = headlineText;
		container.appendChild(headline);

		const viewCalendarButton = document.createElement("button");
		viewCalendarButton.id = "viewCalendarButton" + containerIndex;
		viewCalendarButton.textContent = "View Calendar";
		viewCalendarButton.addEventListener("click", (event) => {
			handleButtonClick(event, "View Calendar", containerIndex);
		});
		container.appendChild(viewCalendarButton);

		const copyLinkButton = document.createElement("button");
		copyLinkButton.id = "copyLinkButton" + containerIndex;
		copyLinkButton.textContent = "Copy Link";
		copyLinkButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Copy Link", containerIndex);
		});
		container.appendChild(copyLinkButton);

		const editButton = document.createElement("button");
		editButton.id = "editButton" + containerIndex;
		editButton.textContent = "Edit";
		editButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Edit", containerIndex);
		});
		container.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.id = "deleteButton" + containerIndex;
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", (event) => {
			handleButtonClick(event, "Delete", containerIndex);
			deleteEventContainer(containerIndex);
		});
		container.appendChild(deleteButton);

		container.id = containerIndex;

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
		addEventContainerModal.style.display = "none";
	};

	const handleButtonClick = (event, buttonText, containerNumber) => {
		const container = event.target.closest(".event-container");
		console.log(
			`${buttonText} button on  container ${containerNumber} clicked.`
		);
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
