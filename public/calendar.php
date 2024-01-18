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
                    <div class="yearDiv">
                        <button id="prevYear">
                            &larr; </button>
                        <span id="currentYear"></span>
                        <button id="nextYear"> &rarr;</button>
                    </div>
                    <div class="monthDiv">
                        <button id="prevMonth"> &rarr;</button>
                        <span id="currentMonth"></span>
                        <button id="nextMonth"> &rarr;</button>
                    </div>
                </div>
                <div class="calendar" id="calendar"></div>
            </div>
            <div id="timeDiv">

            </div>
        </div>
        <div id="footerDiv">
            <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
    </main>

</body>

</html>