document.addEventListener("DOMContentLoaded", function () {
	const addEventButton = document.getElementById("addEventContainer");
	const eventContainersDiv = document.getElementById("eventContainers");

	let containerIndex = 1;

	addEventButton.addEventListener("click", () => {
		createEventContainer(`Event ${containerIndex}`, containerIndex);
		containerIndex++;
	});

	function createEventContainer(headlineText, containerIndex) {
		const container = document.createElement("div");
		container.classList.add("eventContainer");

		const headline = document.createElement("h2");
		headline.textContent = headlineText;
		container.appendChild(headline);

		const viewCalendarButton = document.createElement("button");
		viewCalendarButton.id = "viewCalendarButton" + containerIndex;
		viewCalendarButton.textContent = "View Calendar";
		container.appendChild(viewCalendarButton);

		const copyLinkButton = document.createElement("button");
		copyLinkButton.id = "copyLinkButton" + containerIndex;
		copyLinkButton.textContent = "Copy Link";
		container.appendChild(copyLinkButton);

		const editButton = document.createElement("button");
		editButton.id = "editButton" + containerIndex;
		editButton.textContent = "Edit";
		container.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.id = "deleteButton" + containerIndex;
		deleteButton.textContent = "Delete";
		container.appendChild(deleteButton);

		eventContainersDiv.appendChild(container);
	}
});
