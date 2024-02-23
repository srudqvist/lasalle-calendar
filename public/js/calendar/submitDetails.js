document.addEventListener("DOMContentLoaded", function () {
  const scheduleForm = document.getElementById("scheduleMeetingForm");
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // const dateTime = event.target.date.value;
    const timeZone = document.getElementById("timezone").innerText;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const comments = event.target.comments.value;

    console.log(
      `Timezone: ${timeZone} Name: ${name}, email: ${email} comments: ${comments}`,
    );
  });
});
