const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

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

async function refreshAccessToken(req, res, next) {
  console.log("refresh middelware ran..");
  let accessToken = req.cookies.accessToken;
  let refreshToken = req.cookies.refreshToken;

  try {
    let decodeAccessToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      let decodeRefreshToken = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      if (!decodeRefreshToken) {
        return res.status(401).json({
          message: "access denied",
        });
      }
      console.log("decoded value from refresh token", decodeRefreshToken);
      //check user stored refreshtoken
      let user = await UserModel.findById(decodeRefreshToken.userId).select(
        "+refreshToken",
      );
      console.log("found user", user);

      //compare refresh token and generate a new accesstoken and send it in cookie
      let match = refreshToken === user.refreshToken;
      if (!match) {
        return next();
      }
      //genereate a new access token
      const accessToken = jwt.sign(
        { userId: user._id, name: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE },
      );

      //send it in cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // true in production (https)
        sameSite: "none", // required for cross-origin cookies
        maxAge: 2 * 60 * 60 * 1000, // 7 days
      });
    }
    next();
  }
}

module.exports = { isloggedIn, refreshAccessToken };
