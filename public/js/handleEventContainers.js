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

  const allButtons = document.getElementsByTagName("BUTTON");
  let containerIndex = highestContainerId + 1;
  let editing = false;
  let editContainerIndex = 0;

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

  eventContainersDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const buttonId = event.target.id;
      const containerIndex = buttonId.replace(/\D/g, "");
      console.log(containerIndex);

      if (buttonId.startsWith("viewCalendarButton")) {
        handleButtonClick(event, "View Calendar", containerIndex);
        viewCalendar(containerIndex);
      } else if (buttonId.startsWith("copyLinkButton")) {
        // Handle the "Copy Link" button click
        copyLink(containerIndex);
      } else if (buttonId.startsWith("editButton")) {
        // Handle the "Edit" button click
        getContainerValues(containerIndex);
      } else if (buttonId.startsWith("deleteButton")) {
        // Handle the "Delete" button click
        handleButtonClick(event, "Delete", containerIndex);
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
    // Create object for HTTP request
    const xhr = new XMLHttpRequest();
    // Prepare data to send with the request
    const formData = new FormData();
    formData.append("eventName", eventHeadlineText);
    formData.append("dayFrom", eventStartDay);
    formData.append("dayTo", eventStopDay);
    formData.append("startTime", eventStartTime);
    formData.append("endTime", eventEndTime);
    formData.append("duration", eventDuration);
    formData.append("timeZone", eventTimeZone);
    formData.append("meetingType", eventMeetingType);
    formData.append("description", eventDescription);
    formData.append("eventColor", eventColor);
    formData.append("eventContainerID", containerNumber);
    console.log("FORM DATA: ", formData);
    xhr.open("POST", "../../includes/edit_event_container.php", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Handle successful update if needed
        console.log("Event container updated successfully.");
        location.reload();
      } else {
        console.error("Error updating event container:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Error updating event container:", xhr.statusText);
    };
    // Send the request
    xhr.send(formData);
  };

  const viewCalendar = (containerNumber) => {
    let dummyLink = `http://localhost:3000/public/calendar.php?containerId=${containerNumber}`;
    window.location.href = dummyLink;
  };

  const copyLink = (containerNumber) => {
    // Fetch the link from the db and copy it.
    let dummyLink = `http://localhost:3000/public/calendar.php?containerId=${containerNumber}`;
    console.log(`Copy Link Number: ${containerNumber}`);
    console.log(`Copy Link: ${dummyLink}`);
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

  // Handle the add event container modal
  const openAddEventContainerModal = (submitButtonText) => {
    document.getElementById("submitButton").innerHTML = submitButtonText;
    addEventContainerModal.style.display = "block";
  };
  const closeAddEventContainerModal = () => {
    eventContainerModalForm.reset();
    addEventContainerModal.style.display = "none";
  };

  // Handle the delete message modal
  const openDeleteMessageModal = (containerNumber) => {
    const deleteModalDeleteButton = document.getElementById(
      "deleteModalDeleteButton",
    );
    const deleteModalCancelButton = document.getElementById(
      "deleteModalCancelButton",
    );
    const eventContainerToDelete = document.getElementById(containerNumber);
    deleteMessageModal.style.display = "block";
    deleteModalDeleteButton.addEventListener("click", () => {
      // // Create the object for making the HTTP request
      // const xhr = new XMLHttpRequest();
      // xhr.open("POST", "../../includes/delete_event_container.php", true);
      // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xhr.onload = function () {
      //   if (xhr.status === 200) {
      //     // If the update was successful, remove the event container from the DOM
      //     if (eventContainersDiv.contains(eventContainerToDelete)) {
      //       eventContainersDiv.removeChild(eventContainerToDelete);
      //     }
      //   } else {
      //     console.error("Error deleting event container:", xhr.statusText);
      //   }
      //   closeDeleteMessageModal();
      // };
      // xhr.onerror = function () {
      //   console.error("Error deleting event container:", xhr.statusText);
      //   closeDeleteMessageModal();
      // };
      // xhr.send(`event_container_id=${containerNumber}`);

      fetch("../../includes/delete_event_container.php", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: `event_container_id=${containerNumber}`,
      })
        .then((response) => {
          if (response.ok) {
            // If the update was successful, remove the event container from the DOM
            if (eventContainersDiv.contains(eventContainerToDelete)) {
              eventContainersDiv.removeChild(eventContainerToDelete);
            }
          } else {
            console.error(
              "Error deleting event container:",
              response.statusText,
            );
          }
          closeDeleteMessageModal();
        })
        .catch((error) => {
          console.error("Error deleting event container:", error);
          closeDeleteMessageModal();
        });
    });

    deleteModalCancelButton.addEventListener("click", () => {
      closeDeleteMessageModal();
    });
  };

  const closeDeleteMessageModal = () => {
    deleteMessageModal.style.display = "none";
  };

  const handleButtonClick = (event, buttonText, containerNumber) => {
    const container = event.target.closest(".event-container");
    console.log(
      `${buttonText} button on  container ${containerNumber} clicked.`,
    );
  };

  cancelButton.addEventListener("click", function () {
    // Your code to handle the click event goes here
    console.log("Cancel button clicked!");
    closeAddEventContainerModal();
    if (editing) {
      editing = false;
    }
  });

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
  const makeColorDarker = (eventColor) => {
    // Get the color value from the input
    const hex = eventColor.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Brighten the color (you can adjust the brightness factor)
    const brightnessFactor = 0.7;
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
    console.log(`Brighter Hex: ${brighterHex}`);

    return brighterHex;
  };

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
