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
    <link rel="stylesheet" href="css/meetingConfirmation.css">
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
        <div id="contentDiv">
          <?php
          // Check if meeting details are set in the session
          if(isset($_SESSION['meeting_details'])) {
              // Retrieve meeting details from the session
              $meetingDetails = $_SESSION['meeting_details'];
              ?>
          <div id="confirmation" class="card">
            <h1>Your meeting has been scheduled!</h1>
            <p>An email confirmation has been sent to:<?php echo htmlspecialchars($meetingDetails['email']); ?></p>
            <span id="spanEmail"></span>
            <p>If you need to cancel or reschedule your meeting, please call: 1234567890</p>
            <span id="spanPhone"></span>
            <p>or email: placeholder@email.com</p>
            <span id="facilitatorEmail"></span>
          </div>

          <div id="details" class="card">
            <h1>Meeting Details</h1>
            <p data-label="Facility"> <?php echo htmlspecialchars($meetingDetails['facility']); ?></p>
            <p data-label="Event Name"> <?php echo htmlspecialchars($meetingDetails['eventName']); ?></p>
            <p data-label="Date"> <?php echo htmlspecialchars($meetingDetails['date']); ?></p>
            <p data-label="Time"> <?php echo htmlspecialchars($meetingDetails['time']); ?></p>
            <p data-label="Name"> <?php echo htmlspecialchars($meetingDetails['name']); ?></p>
            <p data-label="Email"> <?php echo htmlspecialchars($meetingDetails['email']); ?></p>
            <p data-label="Timezone"> <?php echo htmlspecialchars($meetingDetails['timezone']); ?></p>
            <p data-label="Comments"> <?php echo htmlspecialchars($meetingDetails['comments']); ?></p>
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
      </div>
    </main>
        <div id="footerDiv">
            <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
  </body>
</html>
