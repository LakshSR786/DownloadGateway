/**
 * MotionStudio contact form relay.
 *
 * Deploy this as a Web App (see setup steps provided separately).
 * It sends mail as the Google account you deploy it under — no
 * password, App Password, or SMTP credentials are stored anywhere
 * in this script or in the public website code.
 */

var RECIPIENT_EMAIL = 'Lakshsr786@gmail.com'; // where contact form messages get delivered

function doPost(e) {
  var result = { ok: false };

  try {
    var data = JSON.parse(e.postData.contents);

    var name = (data.name || '').toString().trim();
    var email = (data.email || '').toString().trim();
    var message = (data.message || '').toString().trim();

    // Basic validation
    if (!name || !email || !message) {
      result.error = 'Missing required fields.';
      return jsonResponse(result);
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      result.error = 'Invalid email address.';
      return jsonResponse(result);
    }

    var subject = 'MotionStudio contact form: ' + name;
    var body =
      'New message from your portfolio contact form\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message;

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: subject,
      body: body
    });

    result.ok = true;
    return jsonResponse(result);

  } catch (err) {
    result.error = err.toString();
    return jsonResponse(result);
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
