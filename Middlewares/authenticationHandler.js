const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const accessToken = req?.headers["authorization"]?.split(" ")[1];
  if (!accessToken) {
    return res.status(404).json({ error: "Token has not been provided" });
  }
  jwt.verify(
    accessToken,
    process.env.JSON_WEB_TOKEN_SECURITY_KEY,
    (err, userDetails) => {
      if (err) {
        return res.status(403).json({ error: "Token has been expired" });
      }
      req.userId = userDetails.userId;
      next();
    }
  );
};
