<!DOCTYPE html>
<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
?>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <script src="./js/components/banner.js" defer></script>
    <title>Meeting Confirmation</title>
  </head>

  <body>
    <main>
      <div class="flex-wrap">
        <div id="navbarDiv">
          <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
        </div>
        <banner-component custom-text="Confirmation" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>">
        </banner-component>

        <div id="confirmation">
          <h1>Your meeting has been scheduled!</h1>
          <p>An email confirmation has been sent to:</p>
          <span id="spanEmail"></span>
          <p>If you need to cancel or reschedule your meeting, please call:</p>
          <span id="spanPhone"></span>
          <p>or email:</p>
          <span id="facilitatorEmail"></span>
        </div>

        <div id="details">
          <h1>Meeting Details</h1>
          <?php
          // Check if meeting details are set in the session
          if(isset($_SESSION['meeting_details'])) {
              // Retrieve meeting details from the session
              $meetingDetails = $_SESSION['meeting_details'];
              ?>
          <p>Facility: <?php echo htmlspecialchars($meetingDetails['facility']); ?></p>
          <p>Event Name: <?php echo htmlspecialchars($meetingDetails['eventName']); ?></p>
          <p>Date: <?php echo htmlspecialchars($meetingDetails['date']); ?></p>
          <p>Time: <?php echo htmlspecialchars($meetingDetails['time']); ?></p>
          <p>Name: <?php echo htmlspecialchars($meetingDetails['name']); ?></p>
          <p>Email: <?php echo htmlspecialchars($meetingDetails['email']); ?></p>
          <p>Timezone: <?php echo htmlspecialchars($meetingDetails['timezone']); ?></p>
          <p>Comments: <?php echo htmlspecialchars($meetingDetails['comments']); ?></p>
          <?php
          } else {
              // Display a message if meeting details are not set in the session
              ?>
          <p>No meeting details found.</p>
          <?php
          }
?>
        </div>

      </div>
    </main>
  </body>
</html>
