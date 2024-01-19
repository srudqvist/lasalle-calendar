<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/calendar.css">
    <script src="./js/calendar/getEventInfo.js"></script>
    <script src="./js/calendar/calendar.js"></script>
    <title>Calendar</title>
</head>

<body>
    <main>
        <div id="navbarDiv">
            <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
        </div>
        <div id="contentDiv">
            <div id="meetingDetailsDiv">
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

            <div id="calendarDiv">
                <div id="calendarControls">
                    <div class="yearDiv gray-out">
                        <button id="prevYear" class="calendar-button">
                            &larr; </button>
                        <span id="currentYear"></span>
                        <button id="nextYear" class="calendar-button"> &rarr;</button>
                    </div>
                    <div class="monthDiv gray-out">
                        <button id="prevMonth" class="calendar-button"> &larr;</button>
                        <span id="currentMonth"></span>
                        <button id="nextMonth" class="calendar-button"> &rarr;</button>
                    </div>
                </div>
                <div class="calendar" id="calendar"></div>
                <button id="nextButton">Next</button>
            </div>
            <div id="timeDiv"></div>

        </div>

        <div id="userDetailsDiv">
            <div id="meetingDetailsDiv">
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
            <div id="meetingDetails">
                <div class="details-container">
                    <div class="label-column">
                        <label for="dateTime">Date/Time:</label>
                        <label for="timeZone">Time Zone:</label>
                        <label for="name">Name:</label>
                        <label for="email">Email:</label>
                    </div>
                    <div class="text-column">
                        <input type="text" id="name" name="name" required placeholder="John Doe">
                        <input type="email" id="email" name="email" required placeholder="john.doe@email.com">
                    </div>
                </div>
                <p>Additional Comments or Requests</p>
                <textarea id="comments" name="comments"></textarea>
            </div>

        </div>

        <div id="footerDiv">
            <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
    </main>

</body>

</html>