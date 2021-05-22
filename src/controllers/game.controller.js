const { Game } = require("../db");
const asyncHandler = require("../middleware/asyncHandler");

exports.findAll = asyncHandler(async (req, res, next) => {
  const games = await Game.findAll({ where: { owner_id: req.user.id } });

  if (games) {
    res.status(200).json({ games });
  } else {
    next({
      message: "Games not found",
      statusCode: 400,
    });
  }
});

exports.findOne = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({
    where: { id: req.params.id, owner_id: req.user.id },
  });

  if (game) {
    res.status(200).json({ game });
  } else {
    next({
      message: "Game not found",
      statusCode: 400,
    });
  }
});

exports.create = asyncHandler(async (req, res, next) => {
  const newGame = await Game.create({
    owner_id: req.user.id,
    title: req.body.title,
    studio: req.body.studio,
    esrb_rating: req.body.esrb_rating,
    user_rating: req.body.user_rating,
    have_played: req.body.have_played,
  });

  res.status(200).json({ game: newGame, message: "Game successfully created" });
});

exports.update = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({
    where: { id: req.params.id, owner_id: req.user.id },
  });

  if (game) {
    await game.update({
      title: req.body.title,
      studio: req.body.studio,
      esrb_rating: req.body.esrb_rating,
      user_rating: req.body.user_rating,
      have_played: req.body.have_played,
    });

    res.status(200).json({
      game,
      message: "Game successfully updated",
    });
  } else {
    next({
      message: "Game not found",
      statusCode: 400,
    });
  }
});

exports.remove = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({
    where: { id: req.params.id, owner_id: req.user.id },
  });

  if (game) {
    await game.destroy();
    res.status(200).json({
      game,
      message: "Game successfully deleted",
    });
  } else {
    next({
      message: "Game not found",
      statusCode: 400,
    });
  }
});
