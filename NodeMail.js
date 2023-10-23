const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  service: process.env.NODE_MAIL_SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASS
  }
});


async function sendPasswordResetEmail(otp) {
  // send mail with defined transport object
  const mailOptions = {
    from: `Ankit ${process.env.NODE_MAIL_USER}`,
    to: "ankitgupta@topsinfosolutions.com",
    subject: "Reset Your Password",
    text:`Please enter this otp to reset your password ${otp}`
  }
  try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully")
      
  } catch (error) {
    console.log("Error while sending email", error.message)
  }

}

module.exports = sendPasswordResetEmail