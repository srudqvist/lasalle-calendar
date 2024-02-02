
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <!-- <link rel="stylesheet" href="css/login.css"> -->
    <!-- <link rel="stylesheet" href="css/formStyles.css"> -->
    <link rel="stylesheet" href="css/schedule.css">
    <link rel="stylesheet" href="./css/modal.css">
    <script src="./js/components/banner.js" defer></script>
    <script src="./js/schedule.js" defer></script>
    <title>Virtual Attorney Visitation Online Calendar</title>
  </head>

  <body>
    <div id="navbarDiv">
      <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
    </div>
    <main>
      <banner-component custom-text="Events | Scheduled" label="lasalle.user@lasallecorrections.com">
      </banner-component>
      <div id="scheduledTableDiv" class="center_content">
        <table id="outerTable">
          <tr>
            <th id="tableHeader">Scheduled Meetings</th>
          </tr>
          <tr>
            <td class="center_content">
              <br>
              <table id="innerTable">
                <tr>
                  <th class="green-background"><f1>Date</f1></th>
                  <th class="green-background"><f1>Time</f1></th>
                  <th class="green-background"><f1>Event</f1></th>
                  <th class="green-background"><f1>Name</f1></th>
                  <th class="green-background"><f1>Phone</f1></th>
                  <th class="green-background"><f1>Email</f1></th>
                  <th class="green-background"><f1>Notes</f1></th>
                  <th class="green-background"><f1>Delete</f1></th>
                </tr>

                <?php
                // Fake data for demonstration
                $fakeData = array(
                array("2023-02-01", "10:00 AM", "Meeting A", "John Doe", "123-456-7890", "john@example.com", "Some notes", 1),
                array("2023-02-02", "02:30 PM", "Meeting B", "Jane Smith", "987-654-3210", "jane@example.com", "Additional notes", 2),
                array("2023-02-03", "10:00 AM", "Meeting A", "John Smith", "123-456-7890", "john@example.com", "Some notes", 3),
                array("2023-02-02", "02:30 PM", "Meeting B", "Jane Doe", "987-654-3210", "jane@example.com", "Additional notes", 4),
                array("2023-02-01", "10:00 AM", "Meeting A", "John Doe", "123-456-7890", "john@example.com", "Some notes that are quite long actually. I just wanted to see what it would look like. How will it wrap, if it even will wrap... qite long actually. I just wanted to see what it would look like. How will it wrap, if it even will wrap...", 5),
                array("2023-02-02", "02:30 PM", "Meeting B", "Jane Smith", "987-654-3210", "jane@example.com", "Additional notes", 6),
                );




      foreach ($fakeData as $row) { ?>
                <tr id="meeting<?php echo $row[7]?>">
                  <td class="date-column"><?php echo $row[0]; ?></td>
                  <td class="time-column"><?php echo $row[1]; ?></td>
                  <td class="eventTitle-column"><?php echo $row[2]; ?></td>
                  <td class="name-column"><?php echo $row[3]; ?></td>
                  <td class="phone-column"><?php echo $row[4]; ?></td>
                  <td class="email-column"><a href="mailto:<?php echo $row[5]; ?>">&nbsp;<?php echo $row[5]; ?></a></td>
                  <td class="notes-column"><td1><?php echo $row[6]; ?></td1></td>
                  <td class="delete-column"><hypr><a href="del.html?id=<?php echo $row[7]; ?>" title="Delete" target="_blank">Delete</a></hypr></td>
                  <td class="cancel-column"><button class="cancel-button" id="<?php echo $row[7]?>">Cancel</button>
                </tr>
                <?php } ?>
              </table>
              <br>
            </td>
          </tr>
        </table>

      </div>
      <div id="scheduleModal" class="modal fade">
        <div class="modal-content">
                <div id="meetingDetailsDiv">
                    <h1>Meeting Details</h1>
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
                            <checkbox id="sendEmail"></checkbox>
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
  </body>
</html>
