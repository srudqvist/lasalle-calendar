
<!DOCTYPE html>
<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: index.php');
    exit;
}
?>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/facilitatorProfile.css">
    <!--<script src="./js/calendar/calendar.js" type="module"></script>-->
    <script src="./js/components/banner.js" defer></script>
    <script src="./js/utils/movingCard.js" defer></script>
    <title>Profile</title>
  </head>

  <body>
        <div id="navbarDiv">
          <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
        </div>
        <banner-component custom-text="Profile Page" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>">
        </banner-component>
      <h1>Profile Page</h1>
      <div id="contentDiv">
      <div class="card">
        <h3>Settings</h3>
        </div>

      </div>
        <div id="footerDiv">
          <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
        </div>
  </body>
</html>
