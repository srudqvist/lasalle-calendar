<?php
function sendPasswordEmail ($recipient, $password) {

  // Set the recipient email address
  //$to = "recipient@example.com";
  $to = $recipient;

  // Set the email subject
  $subject = "Password Reset";

  // Set the email message
  $message = "This is a reset password email message. New Password: $password";

  // Set additional headers
  $headers = "From: sender@example.com\r\n";
  $headers .= "Reply-To: sender@example.com\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  // Send the email
  if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
    return true;
  } else {
    echo "Failed to send email!";
    return false;
  }
}
