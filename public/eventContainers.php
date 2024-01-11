<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/eventContainer.css">
    <link rel="stylesheet" href="./css/modal.css">
    <script src="./js/handleEventContainers.js"></script>
    <title>Event Containers</title>
</head>

<body>
    <button id="addEventContainer">Add Event Container</button>
    <div id="eventContainers" class="container-row"></div>

    <div id="eventContainerModal" class="modal fade">

        <div class="modal-content">
            <div id="eventContainerModalFormDiv">
                <form action="" method="post" id="eventContainerModalForm" class="modal-form">
                    <span class="close">&times;</span>
                    <h1 class="center_content">Create Event Container</h1>
                    <label for="eventName">Event Name:</label>
                    <input required type="text" name="eventName" id="eventName">
                    <div id="eventNameError"></div>
                    <div id="fromToDiv">
                        <div id="from">
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
                            <input type="time" id="startTime" name="startTime">
                        </div>
                        <div id="to">
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
                            <!-- <label for="availableTimes">Available Times:</label> -->
                            <input type="time" id="endTime" name="endTime">
                        </div>
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
                    <!--<div id="eventColorDiv">
                        <label for="eventColor">Event Color:</label>
                        <div class="color-picker">
                            <div class="color-swatch" id="swatch1"></div>
                            <div class="color-swatch" id="swatch2"></div>
                            <div class="color-swatch" id="swatch3"></div>
                        </div>
                    </div>
-->
                    <label for="eventColor">Event Color:</label>
                    <input type="color" id="eventColorPicker" name="eventColor" value="ff0000">

                    <div id="modalButtonsDiv">
                        <button id="cancelButton" type="button">Cancel</button>
                        <button type="submit">Create New Container</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</body>

</html>