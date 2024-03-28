
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
    <link rel="stylesheet" href="./css/banner/banner2.css">
    <script src="./js/facilitatorProfile.js" type="module"></script>
    <script src="./js/components/banner.js" defer></script>
    <script src="./js/components/banner2.js" defer></script>
    <script src="./js/utils/movingCard.js" defer></script>
    <title>Profile</title>
  </head>

  <body>
    <div id="navbarDiv">
      <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
    </div>
    <!-- <banner-component custom-text="Profile Page" label="<?=htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>"> -->
    <!-- </banner-component> -->
    <script>
var sessionData = {
  email: "<?php echo htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>",
};
</script>
    <div class="navbar" id="myNavbar">
    </div>
    <h1>Settings</h1>
    <div id="contentDiv" class="center_content">
      <div id="userInformationDiv" class="card">
        <div id="headRow">
          <h3>User Information</h3>
          <button id="editButton"><span>&#9998;</span></button>
        </div>
        <div id="userDetailsDiv">
          <label>First Name:</label>
          <span id="firstName"></span>
          <label>Last Name:</label>
          <span id="lastName"></span>
          <label>Primary Email:</label>
          <span id="primaryEmail"></span>
          <label>Secondary Email:</label>
          <span id="secondaryEmail"></span>
          <label>Facility:</label>
          <span id="facility"></span>
          <label>Phone:</label>
          <span id="phone"></span>
          <div id="passwordDiv">
            <button id="changePasswordButton">Change Password</button>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>Preferences</h3>

      </div>
      <div class="card">
        <h3>Other</h3>
      </div>

    </div>
    <div id="footerDiv">
      <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
    </div>
  </body>
</html>
