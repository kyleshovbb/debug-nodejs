const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../db");

exports.signup = (req, res) => {
  const { full_name, username, password, email } = req.body;

  // Validate request
  if (!full_name || !username || !password || !email) {
    res.status(400).send({ error: "Bad Request" });
  } else {
    User.create({
      full_name,
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      email,
    })
      .then((user) => {
        const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({
          user: user.toResponse(),
          token,
        });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

exports.signin = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.passwordHash, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, "lets_play_sum_games_man", {
            expiresIn: 60 * 60 * 24,
          });
          res.json({
            user: user.toResponse(),
            message: "Successfully authenticated.",
            sessionToken: token,
          });
        } else {
          res.status(400).send({ error: "Passwords do not match." });
        }
      });
    } else {
      res.status(400).send({ error: "User not found." });
    }
  });
};
