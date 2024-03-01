
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
        </div>

      </div>
    </main>
  </body>
</html>
