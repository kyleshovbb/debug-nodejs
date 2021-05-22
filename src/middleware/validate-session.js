const jwt = require("jsonwebtoken");

const { User } = require("../db");

module.exports = (req, res, next) => {
  const sessionToken = req.headers.authorization;

  if (!sessionToken) {
    res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(sessionToken, "lets_play_sum_games_man", (err, decoded) => {
    if (decoded) {
      User.findOne({ where: { id: decoded.id } }).then(
        (user) => {
          req.user = user;
          next();
        },
        () => {
          res.status(401).send({ error: "not authorized" });
        }
      );
    } else {
      res.status(400).send({ error: "not authorized" });
    }
  });
};
