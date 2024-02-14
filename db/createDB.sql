
CREATE DATABASE IF NOT EXISTS lasalle_virtual_db;

USE lasalle_virtual_db;

CREATE TABLE IF NOT EXISTS users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    facility VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL
);
