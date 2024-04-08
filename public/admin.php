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
    <link rel="stylesheet" href="./css/banner/banner2.css">
    <script src="./js/components/banner2.js" defer></script>
    <script src="./js/utils/movingCard.js" defer></script>
    <title>Admin</title>
  </head>

  <body>
    <main>
      <div class='flex-wrap'>
        <div id='navbarDiv'>
<?php
include('navbar.php'); ?>
        </div>
      <div class="navbar" id="myNavbar">

      </div>
      <script>
var sessionData = {
  email: "<?php echo htmlspecialchars($_SESSION['email'], ENT_QUOTES)?>",
};
</script>
      </div>
      <div id='users'>

        <div id="scheduledTableDiv" class="center_content">
       <table id="outerTable">
       <tr><th id="tableHeader">Scheduled Meetings</th></tr>
       <tr><td class="center_content"><br><table id="innerTable">
       <tr>
       <th class="green-background"><f1>Last Name</f1></th>
       <th class="green-background"><f1>First Name</f1></th>
       <th class="green-background"><f1>Primary Email</f1></th>
       <th class="green-background"><f1>Secondary Email</f1></th>
       <th class="green-background"><f1>Phone</f1></th>
       <th class="green-background"><f1>Active</f1></th>
       <th class="green-background"><f1>Notes</f1></th>
       <th class="green-background"><f1>Cancel</f1></th>
       </tr>
      </div>
    </main>
  </body>
