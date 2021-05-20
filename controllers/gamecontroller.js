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
        .then((game) => {
            res.status(200).json({ game })
        })
        .catch(() => {
            res.status(500).send(err.message)
        })
})

router.put('/update/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id }})
        .then((game) => {
            game.update({
                title: req.body.title,
                studio: req.body.studio,
                esrb_rating: req.body.esrb_rating,
                user_rating: req.body.user_rating,
                have_played: req.body.have_played
            }).then(() => {
                res.status(200).json({
                    game,
                    message: "Successfully updated"
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })


        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
})

router.delete('/remove/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id }})
        .then((game) => {
            if (game) {
                game.destroy()
                    .then(() => {
                        res.status(200).json({
                            game,
                            message: "Successfully deleted"
                        })
                    })
                    .cat500ch((err) => {
                        res.status(500).json({
                            error: err.message
                        })
                    })
   
            } else {
                res.status(400).send({ error: "Game not found" })
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: err.message
            })
        })
})

module.exports = router;