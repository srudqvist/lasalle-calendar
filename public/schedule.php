
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
                  <td><?php echo $row[0]; ?></td>
                  <td><?php echo $row[1]; ?></td>
                  <td><?php echo $row[2]; ?></td>
                  <td><?php echo $row[3]; ?></td>
                  <td><?php echo $row[4]; ?></td>
                  <td><a href="mailto:<?php echo $row[5]; ?>">&nbsp;<?php echo $row[5]; ?></a></td>
                  <td><td1><?php echo $row[6]; ?></td1></td>
                  <td><hypr><a href="del.html?id=<?php echo $row[7]; ?>" title="Delete" target="_blank">Delete</a></hypr></td>
                  <td><button class="cancel-button" id="<?php echo $row[7]?>">Cancel</button>
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
          <div id="modalButtonsDiv">
            <button id="closeButton" type="submit">Close</button>
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
