/**
 * Format Time in AM/PM
 *
 * This function takes a time string in 24-hour format (HH:mm) and returns the time
 * formatted in AM/PM format.
 *
 * @param {string} time - Time string in 24-hour format (HH:mm).
 * @returns {string} Time formatted in AM/PM format (h:mm AM/PM).
 */

function formatAMPM(time) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = time.split(":").map(Number);

  // Create a Date object to use its time formatting methods
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  // Use Intl.DateTimeFormat to format the time in AM/PM format
  const ampm = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return ampm;
}

export { formatAMPM };
