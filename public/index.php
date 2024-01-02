<?php
echo "Hello World 2";
$myVar = "My Variable";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <title>Virtual Attorney Visitation Online Calendar</title>
</head>


<body>
    <header>
        <!-- Replace this image with a combination of images to ensure it does not need to stretch weird -->
        <img src="img\banner1.png" alt="lasalle">
    </header>
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
    <footer>
        <!-- Header code -->
    </footer>
</body>

</html>