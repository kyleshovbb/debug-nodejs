const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../db').import('../models/user');

router.post('/signup', (req, res) => {
    const { full_name, username, password, email } = req.body

    // Validate request
    if (!full_name || !username || !password || !email) {
        res.status(400).send({ error: "Bad Request" })
    } else {
        User.create({
            full_name,
            username,
            passwordHash: bcrypt.hashSync(password, 10),
            email,
        })
            .then(
                function signupSuccess(user) {
                    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.status(200).json({
                        user: user.toResponse(),
                        token
                    })
                }
            )
            .catch(
                function signupFail(err) {
                    res.status(500).send(err.message)
                }
            )
    }
})

router.post('/signin', (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                    res.json({
                        user: user.toResponse(),
                        message: "Successfully authenticated.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;