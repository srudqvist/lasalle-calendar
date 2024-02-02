document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.getElementsByClassName("cancel-button");
  const deleteScheduleModal = document.getElementById("scheduleModal");
  const scheduleTable = document.getElementById("innerTable");
  const modalEventTitle = document.getElementById("eventTitle");
  const modalMeetingDate = document.getElementById("meetingDate");
  const modalMeetingTime = document.getElementById("meetingTime");
  const modalName = document.getElementById("name");
  const modalEmail = document.getElementById("email");

  scheduleTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("cancel-button")) {
      const buttonID = event.target.id;
      const meetingRowToCancel = document.getElementById(`meeting${buttonID}`);
      if (meetingRowToCancel) {
        openCancelModal(meetingRowToCancel);
      }
    }
  });

  function openCancelModal(meetingRowToCancel) {
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
        closeCancelModal();
        meetingRowToCancel.remove();
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
