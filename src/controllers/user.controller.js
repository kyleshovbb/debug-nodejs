const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../db");
const config = require("../common/config");
const asyncHandler = require("../middleware/asyncHandler");

exports.signup = asyncHandler(async (req, res, next) => {
  const { full_name, username, password, email } = req.body;

  const newUser = await User.create({
    passwordHash: bcrypt.hashSync(password, 10),
    full_name,
    username,
    email,
  });

  const token = jwt.sign({ id: newUser.id }, config.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.status(200).json({
    user: newUser.toResponse(),
    token,
  });
});

exports.signin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (user) {
    bcrypt.compare(req.body.password, user.passwordHash, (err, matches) => {
      if (matches) {
        const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({
          user: user.toResponse(),
          message: "Successfully authenticated",
          sessionToken: token,
        });
      } else {
        next({
          message: "Passwords do not match",
          statusCode: 400,
        });
      }
    });
  } else {
    next({
      message: "User not found",
      statusCode: 400,
    });
  }
});
