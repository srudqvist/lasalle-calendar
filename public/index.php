<!DOCTYPE html>
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
            </form>
        </div>
        <!-- <?php
                echo $_SERVER["DOCUMENT_ROOT"];
                echo "<br>";
                echo $_SERVER["PHP_SELF"];
                echo "<br>";
                echo $_SERVER["SERVER_NAME"];
                echo "<br>";
                echo $_SERVER["REQUEST_METHOD"];

                ?> -->
    </main>
    <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
</body>

</html>