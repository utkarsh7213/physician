const mailer = require('nodemailer');

const mail_transporter = mailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendRegistrationEmail(email, otpCode) {
    const mail_opt = {
      from: 'Physician',
      to: email,
      subject: 'Reset Password',
      text: `Your OTP for verifying Noblevillie's account is ${otpCode}`,
    };
  
    try {
      await mail_transporter.sendMail(mail_opt);
  
      // Email sent successfully.
      return {
        success: true,
        message: `Email sent to ${email} successfully.`,
      };
    } catch (err) {
      // Email failed to send.
      return {
        success: false,
        message: err.message,
      };
    }
  }
module.exports = sendRegistrationEmail;