const jwt = require("jsonwebtoken");

async function isloggedIn(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;
    let decode = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "invalid token" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { isloggedIn };
