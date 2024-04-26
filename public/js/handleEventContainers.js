/**
 * Event Container Management and Modification
 *
 * This JavaScript file manages the creation, editing, and deletion of event containers.
 * It includes functions for scaling elements on mouseover and mouseleave events, as well as for opening and closing modal dialogs for adding and deleting event containers.
 * Additionally, it contains event listeners for interacting with event containers, such as viewing calendars, copying links, editing, and deleting.
 * When an event container is edited or deleted, the changes are asynchronously updated on the server using fetch API calls.
 *
 * Functions:
 * - scaleUpElement(element): Scales up an element on mouseover.
 * - resetScaleElement(element): Resets the scale of an element on mouseleave.
 * - openAddEventContainerModal(submitButtonText): Opens a modal for adding or editing event containers.
 * - closeAddEventContainerModal(): Closes the modal for adding or editing event containers.
 * - openDeleteMessageModal(containerNumber): Opens a modal for confirming the deletion of an event container.
 * - closeDeleteMessageModal(): Closes the modal for confirming the deletion of an event container.
 * - editEventContainer(...): Updates an existing event container with new data.
 * - updateEventContainer(requestData): Asynchronously updates an event container on the server.
 */

import { scaleUpElement, resetScaleElement } from "./utils/scaleElements.js";

document.addEventListener("DOMContentLoaded", () => {
  const addEventButton = document.getElementById("addEventContainer");
  const eventContainersDiv = document.getElementById("eventContainers");
  const cancelButton = document.getElementById("cancelButton");
  const addEventContainerModal = document.getElementById("eventContainerModal");
  const deleteMessageModal = document.getElementById("deleteMessageModal");
  const eventContainerModalForm = document.getElementById(
    "eventContainerModalForm",
  );
  const closeIcon = document.getElementsByClassName("close")[0];
  const allButtons = document.getElementsByTagName("BUTTON");
  let editing = false;
  let editContainerIndex = 0;

  // Add the scaling eventlisteners to the close icon
  closeIcon.addEventListener("mouseover", () => scaleUpElement(closeIcon, 2.0));
  closeIcon.addEventListener("mouseleave", () => resetScaleElement(closeIcon));

  // Add the scaling eventlisteners to all the buttons
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mouseover", () =>
      scaleUpElement(allButtons[i]),
    );

    allButtons[i].addEventListener("mouseleave", () =>
      resetScaleElement(allButtons[i]),
    );
  }

  addEventButton.addEventListener("click", () => {
    openAddEventContainerModal("Create New Container");
  });

  // Handle button presses on the event containers
  eventContainersDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const buttonId = event.target.id;
      const containerIndex = buttonId.replace(/\D/g, "");

      if (buttonId.startsWith("viewCalendarButton")) {
        viewCalendar(containerIndex);
      } else if (buttonId.startsWith("copyLinkButton")) {
        copyLink(containerIndex);
      } else if (buttonId.startsWith("editButton")) {
        getContainerValues(containerIndex);
      } else if (buttonId.startsWith("deleteButton")) {
        deleteEventContainer(containerIndex);
      }
    }
  });

  eventContainerModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const eventColor = event.target.eventColor.value;
    const eventStartDay = event.target.dayFrom.value;
    const eventStopDay = event.target.dayTo.value;
    const eventStartTime = event.target.startTime.value;
    const eventEndTime = event.target.endTime.value;
    const eventDuration = event.target.duration.value;
    const eventTimeZone = event.target.timeZone.value;
    const eventMeetingType = event.target.meetingType.value;
    const eventDescription = event.target.description.value;
    const eventName = event.target.eventName.value;

    if (!editing) {
      eventContainerModalForm.submit();
    } else if (editing) {
      editEventContainer(
        eventName,
        eventColor,
        eventStartDay,
        eventStartTime,
        eventStopDay,
        eventEndTime,
        eventDuration,
        eventTimeZone,
        eventMeetingType,
        eventDescription,
        editContainerIndex,
      );
      editing = false;
      closeAddEventContainerModal();
    }
  });

  const getContainerValues = (containerNumber) => {
    const eventContainerToEdit = document.getElementById(containerNumber);

    const headline =
      eventContainerToEdit.getElementsByClassName("event-headline")[0]
        .innerHTML;

    const dayRange =
      eventContainerToEdit.getElementsByClassName("day-range")[0].innerHTML;

    const [startDay, endDay] = dayRange.split(" - ");

    const timeRange =
      eventContainerToEdit.getElementsByClassName("time-range")[0].innerHTML;

    const [startTime, endTime] = timeRange.split(" - ");

    const duration = eventContainerToEdit
      .getElementsByClassName("duration")[0]
      .innerHTML.split(": ")[1];

    const timeZone =
      eventContainerToEdit.getElementsByClassName("time-zone")[0].innerHTML;

    const meetingType = eventContainerToEdit
      .getElementsByClassName("meeting-type")[0]
      .innerHTML.split(": ")[1];

    const description = document.getElementById(
      "description" + containerNumber,
    ).textContent;

    const eventColor = eventContainerToEdit.style.cssText.split(": ")[1];
    const eventColorSanitized = eventColor.split(";")[0];
    let formHeadline = document.getElementById("eventName");
    const formStartDay = document.getElementById("dayFrom");
    const formEndDay = document.getElementById("dayTo");
    const formStartTime = document.getElementById("startTime");
    const formEndTime = document.getElementById("endTime");
    const formDuration = document.getElementById("duration");
    const formTimeZone = document.getElementById("timeZone");
    const formMeetingType = document.getElementById("meetingType");
    const formDescription = document.getElementById("description");
    const formEventColor = document.getElementById("eventColorPicker");

    formHeadline.value = headline;
    formStartDay.value = startDay;
    formEndDay.value = endDay;
    formStartTime.value = startTime;
    formEndTime.value = endTime;
    formDuration.value = duration;
    formTimeZone.value = timeZone;
    formMeetingType.value = meetingType;
    formDescription.value = description;
    formEventColor.value = eventColorSanitized;

    editing = true;
    editContainerIndex = containerNumber;

    openAddEventContainerModal("Edit Event Container");
  };

  const editEventContainer = (
    eventHeadlineText,
    eventColor,
    eventStartDay,
    eventStartTime,
    eventStopDay,
    eventEndTime,
    eventDuration,
    eventTimeZone,
    eventMeetingType,
    eventDescription,
    containerNumber,
  ) => {
    const requestData = {
      eventName: eventHeadlineText,
      startDay: eventStartDay,
      endDay: eventStopDay,
      startTime: eventStartTime,
      endTime: eventEndTime,
      duration: eventDuration,
      timeZone: eventTimeZone,
      meetingType: eventMeetingType,
      description: eventDescription,
      eventColor: eventColor,
      eventContainerID: containerNumber,
    };

    const editSuccess = updateEventContainer(requestData);

    if (editSuccess) {
      location.reload();
    } else {
      console.log("Could not update");
    }
  };

  // Todo: secure the link and have it expire after a set amount of time
  const viewCalendar = (containerNumber) => {
    let dummyLink = `http://localhost:3000/public/calendar.php?containerId=${containerNumber}`;
    window.location.href = dummyLink;
  };

  const copyLink = (containerNumber) => {
    let dummyLink = `http://localhost:3000/public/calendar.php?containerId=${containerNumber}`;
    const myButton = document.getElementById(
      "copyLinkButton" + containerNumber,
    );

    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(dummyLink)
      .then(() => {
        console.log("Link copied to clipboard");
        if (myButton) {
          myButton.textContent = "Link Copied!";
          setTimeout(() => {
            myButton.textContent = "Copy Link";
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error copying link to clipboard: ", error);
      });
  };

  const deleteEventContainer = (containerNumber) => {
    openDeleteMessageModal(containerNumber);
  };

  const openAddEventContainerModal = (submitButtonText) => {
    document.getElementById("submitButton").innerHTML = submitButtonText;
    addEventContainerModal.style.display = "block";
  };

  const closeAddEventContainerModal = () => {
    eventContainerModalForm.reset();
    addEventContainerModal.style.display = "none";
  };

  const openDeleteMessageModal = (containerNumber) => {
    const deleteModalDeleteButton = document.getElementById(
      "deleteModalDeleteButton",
    );

    const deleteModalCancelButton = document.getElementById(
      "deleteModalCancelButton",
    );

    const eventContainerToDelete = document.getElementById(containerNumber);
    deleteMessageModal.style.display = "block";

    deleteModalDeleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(
          "../../includes/delete_event_container.php",
          {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
            body: `event_container_id=${containerNumber}`,
          },
        );

        if (response.ok) {
          if (eventContainersDiv.contains(eventContainerToDelete)) {
            eventContainersDiv.removeChild(eventContainerToDelete);
          }
        } else {
          console.error("Error deleting event container:", response.statusText);
        }

        closeDeleteMessageModal();
      } catch (error) {
        console.error("Error deleting event container:", error);
        closeDeleteMessageModal();
      }
    });

    deleteModalCancelButton.addEventListener("click", () => {
      closeDeleteMessageModal();
    });
  };

  const closeDeleteMessageModal = () => {
    deleteMessageModal.style.display = "none";
  };

  cancelButton.addEventListener("click", function () {
    closeAddEventContainerModal();

    if (editing) {
      editing = false;
    }
  });

  window.addEventListener("click", function (event) {
    if (event.target === addEventContainerModal) {
      closeAddEventContainerModal();

      if (editing) {
        editing = false;
      }
    }
  });

  document.querySelector(".close").addEventListener("click", () => {
    closeAddEventContainerModal();
    if (editing) {
      editing = false;
    }
  });
});

async function updateEventContainer(requestData) {
  try {
    const url = "../../includes/edit_event_container.php";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      if (data["success"] === true) {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
