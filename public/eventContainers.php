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
                        <label class="col-25" for="timeZone">Time Zone:</label>
                        <select class="col-75" required name="timeZone" id="timeZone" placeholder="">
                            <option>Central Time Zone</option>
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
                            <input class="col-75" type="color" id="eventColorPicker" name="eventColor" value="#ff0000">
                        </div>
                    </div>

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