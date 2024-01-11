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
            <span class="close">&times;</span>
            <div class="modal-header">
                <h5 class="modal-title">Create New Event Container</h5>
            </div>
            <div class="modal-body">
                <p>Test text for modal</p>
            </div>
        </div>

    </div>
</body>

</html>