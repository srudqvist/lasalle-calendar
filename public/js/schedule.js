document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.getElementsByClassName("cancel-button");
  const deleteScheduleModal = document.getElementById("scheduleModal");
  const scheduleTable = document.getElementById("innerTable");
  const modalEventTitle = document.getElementById("eventTitle");
  const modalMeetingDate = document.getElementById("meetingDate");
  const modalMeetingTime = document.getElementById("meetingTime");
  const modalName = document.getElementById("name");
  const modalEmail = document.getElementById("email");

  console.log("Cancel Button 0: " + cancelButtons[0].id);
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
    const eventTitle =
      meetingRowToCancel.querySelector(".eventTitle-column").innerText;
    const date = meetingRowToCancel.querySelector(".date-column").innerText;
    const time = meetingRowToCancel.querySelector(".time-column").innerText;
    const name = meetingRowToCancel.querySelector(".name-column").innerText;
    const email = meetingRowToCancel.querySelector(".email-column").innerText;

    modalEventTitle.textContent = eventTitle;
    modalMeetingDate.textContent = date;
    modalMeetingTime.textContent = time;
    modalName.textContent = name;
    modalEmail.textContent = email;

    deleteScheduleModal.style.display = "block";
    const confirmCancel = document.getElementById("confirmCancel");
    if (confirmCancel) {
      confirmCancel.addEventListener("click", () => {
        console.log("Confirm Cancel Clicked");
        meetingRowToCancel.remove();
      });
    }
  }
});
