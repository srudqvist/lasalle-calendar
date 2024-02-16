
CREATE DATABASE IF NOT EXISTS lasalle_virtual_db;

USE lasalle_virtual_db;

-- Create the table for the users
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    facility VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the table for the event containers
CREATE TABLE IF NOT EXISTS event_containers (
    event_container_id INT AUTO_INCREMENT PRIMARY KEY,
    facility VARCHAR(50) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    start_day VARCHAR(20) NOT NULL,
    end_day VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    time_zone VARCHAR(50) NOT NULL,
    meeting_type VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL
);
