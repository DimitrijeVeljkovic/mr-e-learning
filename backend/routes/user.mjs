import express from 'express';
import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenCheckMiddleware from '../middleware/token-check.mjs';

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
                token,
                user: foundUser
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: "Auth failed!"
            });
        });
});

router.put('/:userId/change', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;
    const data = req.body;

    User.findByIdAndUpdate(userId, { $set: data }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            res.status(200).json({
                message: 'User updated successfully!',
                user
            })
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.delete('/:userId/delete', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;

    User.findByIdAndDelete(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            res.status(200).json({
                message: 'User deleted successfully!'
            })
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

router.post('/:userId/bookmark-course', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.body.courseId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }
            if (user.bookmarkedCourses.includes(courseId)) {
                return res.status(400).json({
                    message: 'Course already bookmarked!'
                });
            }

            user.bookmarkedCourses.push(courseId);

            user.save()
                .then(() => {
                    res.status(200).json({ 
                        message: 'Course bookmarked successfully!'
                    });
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/:userId/start-course', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.body.courseId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }
            if (user.inProgressCourses.find(course => course.courseId === courseId)) {
                return res.status(400).json({
                    message: 'Course already in progress!'
                });
            }

            user.inProgressCourses.push({
                courseId,
                notes: []
            });

            user.save()
                .then(() => {
                    res.status(200).json({ 
                        message: 'Course started successfully!'
                    });
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/:userId/add-note/:courseId', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const newNote = req.body.newNote;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            const inProgressCourse = user.inProgressCourses.find(course => course.courseId === courseId);

            if (!inProgressCourse) {
                return res.status(404).json({
                    message: 'Course not found in progress!'
                });
            }

            inProgressCourse.notes.push(newNote);

            user.save()
                .then(() => {
                    res.status(200).json({
                        message: 'Note addded successfully',
                        note: newNote
                    })
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

export default router;