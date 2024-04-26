/**
 * Schedule Management and Event Cancellation
 *
 * This JavaScript file handles the management of schedules and event cancellation functionality.
 * It includes functions for scaling elements on mouseover and mouseleave events, as well as for opening and closing a modal for canceling events.
 * Additionally, it contains event listeners for interacting with the schedule table, cancel buttons, and checkboxes.
 * When a cancel button is clicked, it triggers the opening of a modal displaying event details, allowing the user to
 * confirm the cancellation of the event.
 * Upon confirmation, the event is deleted from the schedule and removed from the DOM.
 *
 * Functions:
 * - scaleUpElement(element): Scales up an element on mouseover.
 * - resetScaleElement(element): Resets the scale of an element on mouseleave.
 * - openCancelModal(meetingRowToCancel, meetingID): Opens a modal for canceling an event, displaying event details.
 * - closeCancelModal(): Closes the cancel event modal.
 */

import { scaleUpElement, resetScaleElement } from "./utils/scaleElements.js";

document.addEventListener("DOMContentLoaded", function () {
  const deleteScheduleModal = document.getElementById("scheduleModal");
  const scheduleTable = document.getElementById("innerTable");
  const modalEventTitle = document.getElementById("eventTitle");
  const modalMeetingDate = document.getElementById("meetingDate");
  const modalMeetingTime = document.getElementById("meetingTime");
  const modalName = document.getElementById("name");
  const modalEmail = document.getElementById("email");
  const allButtons = document.getElementsByTagName("BUTTON");
  const sendEmailCheckbox = document.getElementById("myCheckbox");

  // Add the scaling eventlisteners to all the buttons
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mouseover", () =>
      scaleUpElement(allButtons[i]),
    );
    allButtons[i].addEventListener("mouseleave", () =>
      resetScaleElement(allButtons[i]),
    );
  }

  // Add the scaling eventlisteners to the checkbox
  sendEmailCheckbox.addEventListener("mouseover", () =>
    scaleUpElement(sendEmailCheckbox),
  );
  sendEmailCheckbox.addEventListener("mouseleave", () =>
    resetScaleElement(sendEmailCheckbox),
  );

  scheduleTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("cancel-button")) {
      const buttonID = event.target.id;
      const meetingRowToCancel = document.getElementById(`meeting${buttonID}`);

      if (meetingRowToCancel) {
        openCancelModal(meetingRowToCancel, buttonID);
      }
    }
  });

  function openCancelModal(meetingRowToCancel, meetingID) {
    const eventTitle = meetingRowToCancel
      .querySelector(".eventTitle-column")
      .innerText.trim();

    const date = meetingRowToCancel
      .querySelector(".date-column")
      .innerText.trim();

    const time = meetingRowToCancel
      .querySelector(".time-column")
      .innerText.trim();

    const name = meetingRowToCancel
      .querySelector(".name-column")
      .innerText.trim();

    const email = meetingRowToCancel
      .querySelector(".email-column")
      .innerText.trim();

    modalEventTitle.textContent = eventTitle;
    modalMeetingDate.textContent = date;
    modalMeetingTime.textContent = time;
    modalName.textContent = name;
    modalEmail.textContent = email;

    deleteScheduleModal.style.display = "block";

    const confirmCancel = document.getElementById("confirmCancel");
    const closeButton = document.getElementById("closeButton");

    if (confirmCancel) {
      confirmCancel.addEventListener("click", () => {
        const requestData = {
          meetingID: meetingID,
        };

        // Todo: refactor this to match other fetches when changing anything here
        fetch("../../includes/delete_meeting.php", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (response.ok) {
              // If the update was successful, remove the event container from the DOM
              meetingRowToCancel.remove();
            } else {
              console.error(
                "Error deleting event container:",
                response.statusText,
              );
            }

            closeCancelModal();
          })
          .catch((error) => {
            console.error("Error deleting event container:", error);
            closeCancelModal();
          });
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        closeCancelModal();
      });
    }
  }

  function closeCancelModal() {
    const checkbox = document.getElementById("myCheckbox");
    checkbox.checked = false;
    deleteScheduleModal.style.display = "none";
  }
});
