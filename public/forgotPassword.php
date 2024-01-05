<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/login.css">
    <title>Forgot Password</title>
</head>

<body>
    <div id="navbarDiv">
        <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
    </div>
    <div id="loginForm">
        <form action="/includes/resetPassword.php" method="post" class="modern_form">
            <h1 class="center_content">Reset Password</h1>
            <label for="email">Email:</label>
            <input required type="email" name="email" id="email" placeholder="example@test.com">
            <button type="submit">Reset</button>
        </form>
    </div>
    <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
</body>

</html>