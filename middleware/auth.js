const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send("Accesss denied. No authorization token.");
  try {
    const decoded = await jwt.verify(token, config.get("jsonPrivatKey"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
