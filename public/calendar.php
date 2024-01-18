<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/calendar.css">
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
                        <label for="meetingTitle">Meeting Title:</label>
                        <label for="meetingDate">Meeting Date:</label>
                        <label for="meetingTime">Meeting Time:</label>
                    </div>
                    <div class="text-column">
                        <span id="meetingTitle"></span>
                        <span id="meetingDate"></span>
                        <span id="meetingTime"></span>
                    </div>
                </div>
            </div>
            <div id="calendarDiv">
                <h1>Calendar</h1>
            </div>
        </div>
        <div id="footerDiv">
            <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
    </main>

</body>

</html>