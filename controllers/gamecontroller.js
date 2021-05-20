const router = require('express').Router();
const Game = require('../db').import('../models/game');

router.get('/all', (req, res) => {
    Game.findAll({ where: { owner_id: req.user.id } })
        .then((games) => {
            res.status(200).json({ games })
        })
        .catch(() => {
            res.status(500).json({
                message: "Games is not defined"
            })
        })
})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then((game) => {
            res.status(200).json({ game })
        })
        .catch(() => {
            res.status(500).json({
                message: "Game not found"
            })
        })
})

router.post('/create', (req, res) => {
    Game.create({
        owner_id: req.user.id,
        title: req.body.title,
        studio: req.body.studio,
        esrb_rating: req.body.esrb_rating,
        user_rating: req.body.user_rating,
        have_played: req.body.have_played
    })
        .then(
            function createSuccess(game) {
                res.status(200).json({ game })
            },
            function createFail(err) {
                res.status(500).send(err.message)
            }
        )
})

router.put('/update/:id', (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        })
        .then(
            function updateSuccess(game) {
                res.status(200).json({
                    game,
                    message: "Successfully updated."
                })
            },

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }

        )
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(game) {
            res.status(200).json({
                game,
                message: "Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router;