document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.getElementsByClassName("cancel-button");
  const deleteScheduleModal = document.getElementById("scheduleModal");
  const scheduleTable = document.getElementById("innerTable");

  console.log("Cancel Button 0: " + cancelButtons[0].id);
  scheduleTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel-button")) {
      // A button with class 'myButton' was clicked
      const buttonID = event.target.id;
      console.log("Button clicked:", buttonID);
      const meetingRowToCancel = document.getElementById(`meeting${buttonID}`);
      if (meetingRowToCancel) {
        meetingRowToCancel.remove();
      }
    }
  });
});
