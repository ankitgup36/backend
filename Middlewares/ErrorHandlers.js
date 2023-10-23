const { validateEmail } = require("../common.js");

exports.errorHandler = (err, req, res, next) => {
  const { email } = req.body;
  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return res.status(500).json({ message: "Please enter a valid email" });
  }
  next();
};
