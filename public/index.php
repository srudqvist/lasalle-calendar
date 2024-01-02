<?php
echo "Hello World 2";
$myVar = "My Variable";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>


<body>
    <header>
        <!-- Header code -->
    </header>
    <main>
        <h1>Login</h1>
        <form action="includes/formhandler.php" method="post">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="example@test.com">
            <label for="email">Password:</label>
            <input type="password" name="password" id="password" placeholder="password123">
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