const { Game } = require("../db");

exports.findAll = (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } })
    .then((games) => {
      res.status(200).json({ games });
    })
    .catch(() => {
      res.status(500).json({
        message: "Games is not defined",
      });
    });
};

exports.findOne = (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
    .then((game) => {
      if (game) {
        res.status(200).json({ game });
      } else {
        res.status(400).json({
          message: "Game not found",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        message: "Game not found",
      });
    });
};

exports.create = (req, res) => {
  Game.create({
    owner_id: req.user.id,
    title: req.body.title,
    studio: req.body.studio,
    esrb_rating: req.body.esrb_rating,
    user_rating: req.body.user_rating,
    have_played: req.body.have_played,
  })
    .then((game) => {
      res.status(200).json({ game });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
    .then((game) => {
      if (game) {
        game
          .update({
            title: req.body.title,
            studio: req.body.studio,
            esrb_rating: req.body.esrb_rating,
            user_rating: req.body.user_rating,
            have_played: req.body.have_played,
          })
          .then(() => {
            res.status(200).json({
              game,
              message: "Successfully updated",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            });
          });
      } else {
        res.status(400).json({
          message: "Game not found",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};

exports.remove = (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
    .then((game) => {
      if (game) {
        game
          .destroy()
          .then(() => {
            res.status(200).json({
              game,
              message: "Successfully deleted",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            });
          });
      } else {
        res.status(400).send({ message: "Game not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};
