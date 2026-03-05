/**
 * sendEmail.js
 * Email sending is stubbed out. Replace with your preferred provider
 * (e.g. Nodemailer, SendGrid, Resend) if you need to send actual emails.
 */

const run = async (subject, body, toEmailId) => {
  console.log(`[Email Stub] To: ${toEmailId} | Subject: ${subject}`);
  // TODO: Integrate a real email provider here
};

module.exports = { run };
