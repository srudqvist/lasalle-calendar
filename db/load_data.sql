USE lasalle_virtual_db;

INSERT INTO users (facility, email, first_name, last_name, phone, password) VALUES
('Facility 1', 'john.doe@example.com', 'John', 'Doe', '123-456-7890', '$2y$10$pV2OWTWlyVvpTDeX7zAA5e0/LC5Jl7aiwiQwW5xKTNWrRpIGo4JLa'), 
('Facility 1', 'jane.smith@example.com', 'Jane', 'Smith', '987-654-3210', '$2y$10$gjijKbtPTORm1Nn7KF7Eu.k32s/vmHzTE1z4AQGzQcKcK8pl5qhc2'), 
('Facility 2', 'robert.johnson@example.com', 'Robert', 'Johnson', '555-555-5555', '$2y$10$D2nNpUptp3qqsQ7NWcxBMO75/upgnJ3ZTXfXRXSpB25QPu7tfN9em'), 
('Facility 3', 'emily.wilson@example.com', 'Emily', 'Wilson', '555-555-5555', '$2y$10$k09oIyC12GkE2EiIjWmedO.qvkT1ytHKhYVlEWpIBcOzGvXUkXak6'); 


    -- 'SuperSecret!123',
    -- 'MyPassword123!',
    -- 'p@ssw0rd!',
    -- 'longerThanBefore!123'

-- use to get hashes for test passwords
-- <?php
-- session_start();
-- $passwords = [
--     "SuperSecret!123",
--     "MyPassword123!",
--     "p@ssw0rd!",
--     "longerThanBefore!123"
-- ];
--
-- foreach ($passwords as $password) {
--     $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
--     echo "Password: $password, Hashed: $hashedPassword <br>";
-- }
-- ?>

INSERT INTO event_containers (facility, event_name, start_day, end_day, start_time, end_time, time_zone, meeting_type, description, color) VALUES
('Facility 1', 'Team Meeting', 'Monday', 'Monday', '09:00:00', '11:00:00', 'America/New_York', 'Regular', 'Weekly team meeting to discuss project updates and goals.', '#FF5733'),
('Facility 1', 'Training Workshop', 'Wednesday', 'Friday', '13:00:00', '16:00:00', 'Europe/London', 'Workshop', 'Three-day training workshop on new software tools.', '#0099FF'),
('Facility 2', 'Executive Briefing', 'Tuesday', 'Tuesday', '10:30:00', '12:00:00', 'America/Los_Angeles', 'Executive', 'Monthly executive briefing on company performance.', '#FF9900'),
('Facility 3', 'Project Kickoff', 'Thursday', 'Thursday', '11:00:00', '13:00:00', 'Asia/Tokyo', 'Project', 'Kickoff meeting for the new marketing campaign project.', '#66FF33');



INSERT INTO scheduled_meetings (facility, name, meeting_date, meeting_time, phone, event_name, email, notes, isDeleted) VALUES
('Facility 1', 'John Doe', '2024-02-24', '09:00:00', '+1234567890', 'Team Meeting', 'john@example.com', 'Discuss project updates and goals', false),
('Facility 1', 'Jane Smith', '2024-02-26', '13:00:00', '+1234567890', 'Training Workshop', 'jane@example.com', 'Attend training workshop on new software tools', false),
('Facility 2', 'Alice Johnson', '2024-02-25', '10:30:00', '+1234567890', 'Executive Briefing', 'alice@example.com', 'Monthly executive briefing on company performance', false),
('Facility 3', 'Bob Williams', '2024-02-27', '11:00:00', '+1234567890', 'Project Kickoff', 'bob@example.com', 'Kickoff meeting for the new marketing campaign project', false);
