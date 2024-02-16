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
    <link rel="stylesheet" href="./css/eventContainer.css">
    <link rel="stylesheet" href="./css/modal.css">
    <script src="./js/handleEventContainers.js"></script>
    <script src="./js/components/banner.js" defer></script>
    <title>Event Containers</title>
</head>

  <body>
    <div id="navbarDiv">
      <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found  -->
    </div>
    <main>
<banner-component custom-text="Events | Scheduled" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>">
      </banner-component>
      <p>Welcome back, <?=htmlspecialchars($_SESSION['first_name'], ENT_QUOTES)?>!</p>
      <button id="addEventContainer">Add Event Container</button>
      <div id="eventContainers" class="container-row">
      <?php
      // Include the PHP script to retrieve event containers
      include '../includes/loadEventContainers.php';
?>
      </div>
      <div id="eventContainerModal" class="modal fade">

        <div class="modal-content">
          <div id="eventContainerModalFormDiv">
            <form action="" method="post" id="eventContainerModalForm" class="modal-form">
              <span class="close">&times;</span>
              <h1 class="center_content">Create Event Container</h1>
              <div class="row">
                <label class="col-25" for="eventName">Event Name:</label>
                <input class="col-75" required type="text" name="eventName" id="eventName">
              </div>
              <div class="row" id="fromToDiv">
                <div id="from">
                  <label class="col-25" for="dayFrom">Available Days:</label>
                  <div class="col-75">
                    <select class="col-75" required name="dayFrom" id="dayFrom" placeholder="Monday">
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                    <label for="dayTo"> - </label>
                    <select class="col-75" required name="dayTo" id="dayTo" placeholder="Friday">
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div id="to">
                  <!-- <label for="dayTo">To:</label> -->

                  <label class="col-25" for="availableTimes">Available Times:</label>
                  <div class="col-75">
                    <input required type="time" id="startTime" name="startTime">
                    <label for="availableTimes"> - </label>
                    <input required type="time" id="endTime" name="endTime">
                  </div>
                </div>
              </div>
              <div class="row">
                <label class="col-25" for="timeZone">Duration:</label>
                <select class="col-75" required name="duration" id="duration" placeholder="">
                  <option data-minutes="30">30 min</option>
                  <option data-minutes="60">1h</option>
                  <option data-minutes="90">1h 30 min</option>
                  <option data-minutes="120">2h</option>
                </select>
              </div>
              <div class="row">
                <label class="col-25" for="timeZone">Time Zone:</label>
                <select class="col-75" required name="timeZone" id="timeZone" placeholder="">
                  <option>Central Time Zone</option>
                  <option>Eastern Time Zone</option>
                  <option>Pacific Time Zone</option>
                </select>
              </div>
              <div class="row">
                <label class="col-25" for="meetingType">Meeting Type:</label>
                <select class="col-75" required name="meetingType" id="meetingType" placeholder="">
                  <option>Zoom</option>
                  <option>Teams</option>
                  <option>Phone</option>
                </select>
              </div>
              <div class="row">
                <label class="col-25" for="description">Description:</label>
                <textarea class="col-75" id="description" name="description" placeholder="Description"></textarea>
              </div>
              <!--<div id="eventColorDiv">
<label for="eventColor">Event Color:</label>
<div class="color-picker">
<div class="color-swatch" id="swatch1"></div>
<div class="color-swatch" id="swatch2"></div>
<div class="color-swatch" id="swatch3"></div>
</div>
</div>
-->
              <div class="row">
                <div class="color-picker">
                  <label class="col-25" for="eventColor">Event Color:</label>
                  <input class="col-75" type="color" id="eventColorPicker" name="eventColor" value="#000000">
                </div>
              </div>

              <div id="modalButtonsDiv">
                <button id="cancelButton" type="button">Cancel</button>
                <button id="submitButton" type="submit">Create New Container</button>
              </div>
            </form>
          </div>
        </div>

      </div> 

    </main>
    <div id="footerDiv" class="footer">
      <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
    </div>
  </body>

</html>
