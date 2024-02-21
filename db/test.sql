-- Test the users table
SELECT * FROM users;
SELECT * FROM users WHERE facility = 'Arkham Asylum';
SELECT * FROM users WHERE last_name = 'Smith';
SELECT * FROM users WHERE phone IS NOT NULL;
SELECT * FROM users WHERE password LIKE 'pass%';
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE first_name LIKE 'E%' AND facility LIKE '%Prison%';


-- Test the event_containers table
SELECT * FROM event_containers;
-- Test filtering by facility
SELECT * FROM event_containers WHERE facility = 'Conference Room A';
-- Test filtering by event name
SELECT * FROM event_containers WHERE event_name = 'Training Workshop';
-- Test filtering by start day
SELECT * FROM event_containers WHERE start_day = 'Monday';
-- Test filtering by end day
SELECT * FROM event_containers WHERE end_day = 'Friday';
-- Test filtering by start time
SELECT * FROM event_containers WHERE start_time >= '09:00:00';
-- Test filtering by end time
SELECT * FROM event_containers WHERE end_time <= '16:00:00';
-- Test filtering by time zone
SELECT * FROM event_containers WHERE time_zone = 'America/New_York';
-- Test filtering by meeting type
SELECT * FROM event_containers WHERE meeting_type = 'Regular';
-- Test filtering by description
SELECT * FROM event_containers WHERE description LIKE '%training%';
-- Test filtering by color
SELECT * FROM event_containers WHERE color = '#FF5733';


-- Test the scheduled_meetings table
SELECT * FROM scheduled_meetings;
-- Test filtering by facility
SELECT * FROM scheduled_meetings WHERE facility = 'Facility 1';
-- Test filtering by name
SELECT * FROM scheduled_meetings WHERE name = 'John Doe';
-- Test filtering by meeting date
SELECT * FROM scheduled_meetings WHERE meeting_date = '2024-02-24';
-- Test filtering by meeting time
SELECT * FROM scheduled_meetings WHERE meeting_time >= '09:00:00';
-- Test filtering by phone (checking if it's not null)
SELECT * FROM scheduled_meetings WHERE phone IS NOT NULL;
-- Test filtering by event name
SELECT * FROM scheduled_meetings WHERE event_name = 'Team Meeting';
-- Test filtering by email
SELECT * FROM scheduled_meetings WHERE email LIKE '%@example.com%';
-- Test filtering by notes
SELECT * FROM scheduled_meetings WHERE notes LIKE '%project%';
-- Test filtering by deletion status
SELECT * FROM scheduled_meetings WHERE isDeleted = false;
