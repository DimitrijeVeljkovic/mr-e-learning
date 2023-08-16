import express from 'express';
import User from '../models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenCheckMiddleware from '../middleware/token-check.mjs';
import Course from '../models/course.mjs';
import nodemailer from 'nodemailer';

const router = express.Router();

// User signup
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
                message: 'User created successfully!',
                result
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });
});
  
// User login
router.post('/login', (req, res, next) => {
    let foundUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed! Email does not exist!'
                });
            }
            foundUser = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed! Incorrect password!'
                });
            }
            const token = jwt.sign(
                { email: foundUser.email, userId: foundUser._id },
                'prijatna_kafica_dragi_prijatelji'
            );

            res.status(200).json({
                token,
                user: foundUser
            });
        })
        .catch(error => {
            return res.status(401).json({
                message: 'Auth failed!'
            });
        });
});

// Send email with verification code and store it in DB for user
router.put('/send-code', (req, res, next) => {
    const email = req.body.email;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const html = `
        <h1>Reset your password</h1>
        <h3>
            Verification code: 
            <span style="background: red; padding: 5px; border-radius: 5px; color: whitesmoke;">${verificationCode}</span>
        <h3>
    `

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mrelearning100@gmail.com',
          pass: 'hzxevhnkzumdtutd'
        },
        secure: true
    });
      
    const mailOptions = {
        from: 'mrelearning100@gmail.com',
        to: email,
        subject: 'Verification code for MR-E-LEARNING',
        html
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json(error);
        } else {
            User.findOneAndUpdate({ email: email }, { $set: { verificationCode: verificationCode } }, { new: true })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            message: 'Email does not exist!'
                        });
                    }

                    res.status(200).json({
                        message: 'Verification code sent!'
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        }
    });
});

// Reset password for user with provided email and verification code
router.put('/reset-password', (req, res, next) => {
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    const newPassword = req.body.newPassword;

    bcrypt.hash(newPassword, 10)
        .then(passwordHash => {
            User.findOneAndUpdate({ email: email, verificationCode: verificationCode }, { $set: { password: passwordHash, verificationCode: '' } }, { new: true })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({
                            message: 'Email or verification code is incorrect!'
                        });
                    }

                    res.status(200).json({
                        message: 'Pasword changed successfully!'
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        });
});

// Change data for user
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

// Delete user from DB
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

// Add course in bookmark for user
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

// Add course inProgress for user
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

// Add note by user for course
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

// Check correctness of the final test and move the course into finishedCourses if the test is passed
router.post('/:userId/submit-test/:courseId', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const submittedAnswers = req.body;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            Course.findById(courseId)
                .then(course => {
                    if (!course) {
                        return res.status(404).json({
                            message: 'Course not found!'
                        });
                    }

                    let correctCount = 0;
                    submittedAnswers.forEach(submittedAnswer => {
                        const correctAnswer = course.finalTest.find(q => q.question === submittedAnswer.question).correctAnswer;

                        if (submittedAnswer.answer === correctAnswer) {
                            correctCount++;
                        }
                    })

                    const percentCorrect = (correctCount / course.finalTest.length) * 100;
                    if (percentCorrect >= 85) {
                        const inProgressCourseIndex = user.inProgressCourses.findIndex(course => course.courseId === courseId);

                        if (inProgressCourseIndex !== -1) {
                            const finishedCourse = {
                                courseId,
                                notes: [...user.inProgressCourses[inProgressCourseIndex].notes],
                                dateFinished: new Date(),
                                percentage: percentCorrect
                            };

                            user.finishedCourses.push(finishedCourse);
                            user.inProgressCourses.splice(inProgressCourseIndex, 1);

                            user.save()
                                .then(() => {
                                    return res.status(200).json({
                                        message: 'Test passed!',
                                        finishedCourse
                                    })
                                });
                        }
                    } else {
                        res.status(404).json({
                            message: 'Test is not passed! Try again!',
                            percentCorrect
                        })
                    }
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

// Return all bookmarked courses for user
router.get('/:userId/bookmarked-courses', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            Course.find({ _id: { $in: user.bookmarkedCourses } })
                .then(bookmarkedCourses => {
                    res.status(200).json({
                        bookmarkedCourses
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Return all in progress courses for user
router.get('/:userId/in-progress-courses', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            Course.find({ _id: { $in: user.inProgressCourses.map(course => course.courseId) } })
                .then(inProgressCourses => {
                    res.status(200).json({
                        inProgressCourses: inProgressCourses.map(course => ({
                            course,
                            notes: user.inProgressCourses.find(c => c.courseId === String(course._id)).notes
                        }))
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Return all finished courses for user
router.get('/:userId/finished-courses', tokenCheckMiddleware, (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found!'
                });
            }

            Course.find({ _id: { $in: user.finishedCourses.map(course => course.courseId) } })
                .then(finishedCourses => {
                    res.status(200).json({
                        finishedCourses: finishedCourses.map(course => {
                            const finishedCourse = user.finishedCourses.find(c => c.courseId === String(course._id))
                            return {
                                course,
                                notes: finishedCourse.notes,
                                dateFinished: finishedCourse.dateFinished,
                                percentage: finishedCourse.percentage
                            }
                        })
                    });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

export default router;