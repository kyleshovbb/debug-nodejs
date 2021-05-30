const jwt = require("jsonwebtoken");

const { User } = require("../db");
const config = require("../common/config");
const asyncHandler = require("./asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const sessionToken = req.headers.authorization;

  if (!sessionToken) {
    next({
      message: "No token provided",
      statusCode: 403,
    });
  }

  jwt.verify(sessionToken, config.JWT_SECRET, async (err, decoded) => {
    if (decoded) {
      try {
        const user = await User.findOne({ where: { id: decoded.id } });
        req.user = user;
        next();
      } catch {
        next({
          message: "Not authorized",
          statusCode: 400,
        });
      }
    } else {
      next({
        message: "Not authorized",
        statusCode: 400,
      });
    }
  });
});
