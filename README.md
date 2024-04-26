# online-calendar

### How to run

Install MySQL, and run the `create_database.sql` script. If you want some test data, run `load_data.sql`  
I recommend using MySQL Workbench when developing but if you are comfortable with the CLI that is fine too.

Make sure the `config.php` file and `lasalle-calendar-env` directory exists and that it has the following relative path:
`../../../../lasalle-calendar-env-variables/config.php`  
Or change the imports in the `includes` directory.  
You can copy the `config.php.bak` file, make sure to update the information to match your db credentials.

Modify your `php.ini` file like the `php.ini.bak` file.

Navigate to the project directory in a terminal  
Run the command: `php -S localhost:3000`  
Open a browser and browse to `http://localhost:3000/public/index.php`

### Development Environment

I use my own custom Neovim configuration.  
To get started with php I recommend using Visual Studio Code. There are a lot of useful extensions that can be useful in this project.  
Some of them are:

- PHP Intelephense
- PHP Server (if you don't want to run the project from the terminal)
- JavaScript (ES6) code snippets
- Prettier - Code formatter
- MySQL

These are just a few suggestions. There are probably more extensions that can be very useful.

### Todo:

#### General

- Secure the link sent to the attorneys.
- - Suggesting JWT
- Implement transactions for DB operations.
- Send emails, how depends on hosting.
- Update file names to snake_case as they are modified.
- Consider encrypting database.
- Decide if facilities should be hard coded or read from database, then update the code accordingly.
- - Hard coding is easier to implement but more work to change at a later date.

#### Confirmation Page

- Display Facilitator/Facility contact information in meeting confirmation

#### Calendar Page

- Display an error message if the link is expired and/or invalid
- Disable dates in past months from being available. (it already works for years)
