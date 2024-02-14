-- Test the users table
SELECT * FROM users;
SELECT * FROM users WHERE facility = 'Arkham Asylum';
SELECT * FROM users WHERE lname = 'Smith';
SELECT * FROM users WHERE phone IS NOT NULL;
SELECT * FROM users WHERE password LIKE 'pass%';
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE fname LIKE 'E%' AND facility LIKE '%Prison%';

-- Test another table
