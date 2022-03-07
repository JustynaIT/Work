const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const login = req.body.login;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hPassword => {
            const user = new User({
                email: email,
                password: hPassword,
                login: login
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'User created!',
                userId: result._id
            });
        })
        .catch(error => {
            if (!error.statusCode)
                error.statusCode = 500;
            next(error);
        });
};

exports.login = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password
    let loadedUser;
    User.findOne({ login: login })
        .then(user => {
            if (!user)
                res.status(401).json({
                    error: "A user with this login could not be found."
                })
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(result => {
            if (!result)
                res.status(401).json({ error: "Wrong password!" })
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret',
                { expiresIn: '24h' }
            );
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString()
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};


exports.get = (req, res, next) => {
    console.log(req.params.id)
    User.findById(req.params.id)
        .then((user) => {
            if (user)
                res.status(200).json({projects: user.projects, email: user.email, _id: user._id})
            else
                res.status(401).json({ error: "Not authenticated." })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};