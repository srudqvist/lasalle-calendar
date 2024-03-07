<!DOCTYPE html>
<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
// if (!isset($_SESSION['loggedin'])) {
//    header('Location: index.php');
//    exit;
//}
?>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/calendar.css">
    <script src="./js/calendar/getEventInfo.js" type="module"></script>
    <script src="./js/calendar/calendar.js" type="module"></script>
    <script src="./js/calendar/submitDetails.js"></script>
    <script src="./js/components/banner.js" defer></script>
    <script src="./js/utils/movingCard.js" defer></script>
    <title>Calendar</title>
  </head>

  <body>
    <main>
      <div class="flex-wrap">
        <div id="navbarDiv">
          <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
        </div>
        <banner-component custom-text="Calendar" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>">
        </banner-component>
        <div id="contentDiv">
          <div id="meetingDetailsDiv" class="preserve-3d-container">
            <div class="card moving-card">
              <h1>Meeting Details</h1>
              <div class="details-container">
                <div class="label-column">
                  <label for="availableDays">Available Days:</label>
                  <label for="meetingType">Meeting Type:</label>
                  <label for="meetingDuration">Meeting Duration:</label>
                  <label for="meetingNotes">Meeting Notes:</label>
                </div>
                <div class="text-column">
                  <span id="availableDays"></span>
                  <span id="meetingType"></span>
                  <span id="meetingDuration"></span>
                  <span id="meetingNotes"></span>
                </div>
              </div>

            </div>
          </div>

          <div id="calendarDiv">
            <div id="calendarControls">
              <div class="yearDiv">
                <button id="prevYear" class="calendar-button">
                  &lt; </button>
                <span id="currentYear"></span>
                <button id="nextYear" class="calendar-button"> &gt;</button>
              </div>
              <div class="monthDiv">
                <button id="prevMonth" class="calendar-button"> &lt;</button>
                <span id="currentMonth"></span>
                <button id="nextMonth" class="calendar-button"> &gt;</button>
              </div>
            </div>
            <div class="card">
              <div class="calendar" id="calendar"></div>
            </div>
            <div id="calendarTimezone"></div>
            <button id="nextButton" class="next-schedule-button">Next</button>
          </div>
          <div id="timeDiv"></div>

        </div>
        <div id="userDetailsDiv">

          <div id="meetingDetailsDiv2">
            <div class="card moving-card">
              <h1>Meeting Details</h1>
              <div class="details-container">
                <div class="label-column">
                  <label for="availableDays">Available Days:</label>
                  <label for="meetingType">Meeting Type:</label>
                  <label for="meetingDuration">Meeting Duration:</label>
                  <label for="meetingNotes">Meeting Notes:</label>
                </div>
                <div class="text-column">
                  <span id="availableDays2"></span>
                  <span id="meetingType2"></span>
                  <span id="meetingDuration2"></span>
                  <span id="meetingNotes2"></span>
                </div>
              </div>
            </div>
          </div>
          <div id="meetingDetailsDiv3">
            <form id="scheduleMeetingForm">
              <div class="card">
                <div class="details-container">
                  <div class="label-column">
                    <label for="dateTime">Date/Time:</label>
                    <label for="timeZone">Time Zone:</label>
                    <label for="name">Name:</label>
                    <label for="email">Email:</label>
                  </div>
                  <div class="text-column">
                    <span id="date-time"></span>
                    <span id="timezone"></span>
                    <input type="text" id="name" name="name" required placeholder="John Doe">
                    <input type="email" id="email" name="email" required placeholder="john.doe@email.com">
                  </div>
                </div>
                <div id="additionalCommentsDiv">
                  <label id="additionalComments" for="comments">Additional Comments and Requests:</label>
                  <textarea id="comments" name="comments"></textarea>
                </div>
                <div id="buttonDiv">
                  <button id="backButton" class="back-button">Back</button>
                  <button type="submit" id="scheduleButton" class="next-schedule-button">Schedule</button>
                </div>
              </div>
            </form>
          </div>


        </div>

        <div id="footerDiv">
          <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
      </div>
    </main>

  </body>

</html>
