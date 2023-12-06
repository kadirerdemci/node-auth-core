// services/MailService.js

const nodemailer = require("nodemailer");
const ServiceResponse = require("../response/serviceResponse");

const MailService = {
  async sendVerificationEmail(userData) {
    try {
      const { email, username, verificationCode } = userData;
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Account Verification",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for registering. Please use the following verification code to confirm your email: <strong>${verificationCode}</strong></p>
          <p>Verification link: http://yourdomain.com/verify-email?email=${email}&code=${verificationCode}</p>
        </div>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return new ServiceResponse(
        true,
        "Verification email sent successfully",
        null,
        200
      );
    } catch (error) {
      console.error(error);
      return new ServiceResponse(
        false,
        "Error sending verification email",
        null,
        500
      );
    }
  },

  // Diğer fonksiyonlar...
};

module.exports = MailService;
