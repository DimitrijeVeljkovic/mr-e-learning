import express from 'express';
import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(passwordHash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: passwordHash,
            inProgressCourses: [],
            bookmarkedCourses: [],
            finishedCourses: []
        });

    user.save()
        .then(result => {
            res.status(200).json({
                message: 'User created!',
                result
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });
});
  
router.post('/login', (req, res, next) => {
    let foundUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed! Email does not exist!"
                });
            }
            foundUser = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed! Incorrect password!"
                });
            }
            const token = jwt.sign(
                { email: foundUser.email, userId: foundUser._id },
                'prijatna_kafica_dragi_prijatelji',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: "Auth failed!"
            });
        });
});

export default router;