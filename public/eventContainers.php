<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/eventContainer.css">
    <link rel="stylesheet" href="./css/modal.css">
    <link rel="stylesheet" href="css/formStyles.css">
    <script src="./js/handleEventContainers.js"></script>
    <title>Event Containers</title>
</head>

<body>
    <button id="addEventContainer">Add Event Container</button>
    <div id="eventContainers" class="container-row"></div>

    <div id="eventContainerModal" class="modal fade">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header">
                <h5 class="modal-title">Create New Event Container</h5>
            </div>
            <div class="modal-body">
                <p>Test text for modal</p>
            </div>
            <div id="eventContainerModalFormDiv">
                <form action="" method="post" id="eventContainerModalForm" class="modern_form">
                    <h1 class="center_content">Create Event Container</h1>
                    <label for="eventName">Event Name:</label>
                    <input required type="text" name="eventName" id="eventName">
                    <div id="eventNameError"></div>
                    <div id="fromToDiv">
                        <label for="dayFrom">From:</label>
                        <select required name="dayFrom" id="dayFrom" placeholder="Monday">
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                        <label for="dayTo">To:</label>
                        <select required name="dayTo" id="dayTo" placeholder="Friday">
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                        <label for="availableTimes">Available Times:</label>
                        <input type="time" id="startTime" name="startTime">
                        <input type="time" id="endTime" name="endTime">
                    </div>
                    <label for="timeZone">Time Zone:</label>
                    <select required name="timeZone" id="timeZone" placeholder="">
                        <option>Central Time Zone</option>
                    </select>
                    <label for="meetingType">Meeting Type:</label>
                    <select required name="meetingType" id="meetingType" placeholder="">
                        <option>Zoom</option>
                        <option>Teams</option>
                        <option>Phone</option>
                    </select>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>


                    <button type="button">Cancel</button>
                    <button type="submit">Create New Container</button>
                </form>
            </div>
        </div>

    </div>
</body>

</html>