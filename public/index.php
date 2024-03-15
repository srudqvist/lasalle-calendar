<!DOCTYPE html>
<?php
session_start();
?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/footer.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/formStyles.css">
    <title>Virtual Attorney Visitation Online Calendar</title>
</head>


<body>
    <main>
        <div id="navbarDiv">
            <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
        </div>

        <div id="loginForm">
            <form action="/includes/login.php" method="post" class="modern_form">
                <h1 class="center_content">Log In</h1>
                <label for="email">Email:</label>
                <input required type="email" name="email" id="email" placeholder="example@test.com">
                <label for="password">Password:</label>
                <input required type="password" name="password" id="password" placeholder="password123">
                <button type="submit">Log In</button>
                <div id="createForgot">
                    <a href="createAccount.php">Create account</a>
                    <a href="forgotPassword.php">Forgot password?</a>
          </div>
          <?php
          // Check if login error message exists
          if (isset($_SESSION['login_error_msg'])) {
              // Display the error message
              echo '<p class="error-message">' . $_SESSION['login_error_msg'] . '</p>';
              // Remove the login error message from the session to prevent it from displaying again
              unset($_SESSION['login_error_msg']);
          }
?>
        </form>
      </div>
    </main>
    <div id="footerDiv"
      <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
    </div>
  </body>

</html>
