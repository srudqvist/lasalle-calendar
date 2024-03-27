
<!DOCTYPE html>
<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.php');
    exit;
}
?>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="./css/banner/banner2.css">
    <!-- <link rel="stylesheet" href="css/login.css"> -->
    <!-- <link rel="stylesheet" href="css/formStyles.css"> -->
    <link rel="stylesheet" href="css/schedule.css">
    <script src="./js/components/banner.js" defer></script>
    <script src="./js/components/banner2.js" defer></script>
    <title>Virtual Attorney Visitation Online Calendar</title>
  </head>

  <body>
    <div id="navbarDiv">
      <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
    </div>
    <main>
      <banner-component custom-text="Events | Scheduled" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>">
      </banner-component>
      <script>
var sessionData = {
  email: "<?php echo htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>",
};
      </script>
      <div class="navbar" id="myNavbar">

      </div>
      <?php
      include '../includes/load_scheduled_meetings.php';
?>
      <div id="scheduleModal" class="modal fade">
        <div class="modal-content">
        <div class="top">
            <h1>Cancel Meeting</h1>
          </div>
          <div id="meetingDetailsDiv">
            <div class="details-container">
              <div class="label-column">
                <label for="eventTitle">Event:</label>
                <label for="meetingDate">Date:</label>
                <label for="meetingTime">Time:</label>
                <label for="name">Name:</label>
                <label for="email">Email:</label>
              </div>
              <div class="text-column">
                <span id="eventTitle"></span>
                <span id="meetingDate"></span>
                <span id="meetingTime"></span>
                <span id="name"></span>
                <span id="email"></span>
                <div class="custom-checkbox">
                  <input type="checkbox" id="myCheckbox" class="checkbox-input">
                  <label for="myCheckbox" class="checkbox-label">Send email notification</label>
                </div>
              </div>
            </div>
          </div>
          <div id="modalButtonsDiv">
            <button id="closeButton" type="button">Close</button>
            <button id="confirmCancel" type="button">Cancel Meeting</button>
          </div>
        </div>
      </div>
    </main>
    <div id="footerDiv">
      <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
    </div>
    <script src="./js/schedule.js" type="module" defer></script>
  </body>
</html>
