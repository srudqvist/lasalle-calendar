document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.getElementsByClassName("cancel-button");
  const deleteScheduleModal = document.getElementById("scheduleModal");
  const scheduleTable = document.getElementById("innerTable");

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
