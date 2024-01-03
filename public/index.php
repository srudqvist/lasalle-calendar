<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/footer.css">
    <title>Virtual Attorney Visitation Online Calendar</title>
</head>


<body>
    <?php include('navbar.php'); ?> <!-- Use require if it should error if navbar.php is not found -->
    <main>
        <h1>Login</h1>
        <form action="/includes/login.php" method="post">
            <label for="email">Email:</label>
            <input required type="email" name="email" id="email" placeholder="example@test.com">
            <label for="email">Password:</label>
            <input required type="password" name="password" id="password" placeholder="password123">
            <button type="submit">Log In</button>
        </form>
        <?php
        echo $_SERVER["DOCUMENT_ROOT"];
        echo "<br>";
        echo $_SERVER["PHP_SELF"];
        echo "<br>";
        echo $_SERVER["SERVER_NAME"];
        echo "<br>";
        echo $_SERVER["REQUEST_METHOD"];

        ?>
    </main>
    <?php include('footer.php'); ?> <!-- Use require if it should error if footer.php is not found -->
</body>

</html>