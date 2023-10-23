const sendPasswordResetEmail = require("./NodeMail");

exports.validateEmail = (userEmail) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return userEmail.match(emailRegex)
}

exports.generateVerificationMailAndSend = async(User, Email) => {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    await User.updateOne({Email}, {oneTimeOTP : verificationCode})
    await sendPasswordResetEmail(verificationCode)
}