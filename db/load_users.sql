USE lasalle_virtual_db;

INSERT INTO users (facility, email, fname, lname, phone, password) VALUES
('Shawshank State Penitentiary', 'john.doe@example.com', 'John', 'Doe', '123-456-7890', '$2y$10$pV2OWTWlyVvpTDeX7zAA5e0/LC5Jl7aiwiQwW5xKTNWrRpIGo4JLa'), 
('Arkham Asylum', 'jane.smith@example.com', 'Jane', 'Smith', '987-654-3210', '$2y$10$gjijKbtPTORm1Nn7KF7Eu.k32s/vmHzTE1z4AQGzQcKcK8pl5qhc2'), 
('Azkaban Prison', 'robert.johnson@example.com', 'Robert', 'Johnson', '555-555-5555', '$2y$10$D2nNpUptp3qqsQ7NWcxBMO75/upgnJ3ZTXfXRXSpB25QPu7tfN9em'), 
('The Rock', 'emily.wilson@example.com', 'Emily', 'Wilson', '555-555-5555', '$2y$10$k09oIyC12GkE2EiIjWmedO.qvkT1ytHKhYVlEWpIBcOzGvXUkXak6'); 


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
