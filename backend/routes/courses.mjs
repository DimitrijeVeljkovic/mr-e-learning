import express from 'express';
import Course from '../models/course.mjs';
import tokenCheckMiddleware from '../middleware/token-check.mjs';
import LearningPath from '../models/learning-path.mjs';
import User from '../models/user.mjs';

const router = express.Router();

// Return all courses from DB
router.get('', (req, res, next) => {
    Course.find().then(courses => {
        res.status(200).json({
            courses
        });
    });
});

// Add new rating for course
router.post('/:courseId/add-rating', tokenCheckMiddleware, (req, res, next) => {
    const courseId = req.params.courseId;
    const { userName, rating } = req.body;

    Course.findById(courseId).then(course => {
        course.ratings.push({
            userName,
            rating
        });

        const totalRatings = course.ratings.length;
        const sumOfRatings = course.ratings.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = sumOfRatings / totalRatings;

        course.save().then(() => {
            res.status(200).json({ averageRating });
        });
    });
});
  
// Add new comment for course
router.post('/:courseId/add-comment', tokenCheckMiddleware, (req, res, next) => {
    const courseId = req.params.courseId;
    const { userName, comment } = req.body;

    Course.findById(courseId).then(course => {
        course.comments.push({
            userName,
            comment
        });

        course.save().then(() => {
            res.status(200).json({ comments: course.comments });
        });
    });
});

// Return number of all courses
router.get('/count', (req, res, next) => {
    Course.countDocuments().then(courseCount => {
        LearningPath.countDocuments().then(learningPathCount => {
            if (!req.query.userId) {
                return res.status(200).json({
                    courseCount,
                    learningPathCount
                })
            }

            User.findById(req.query.userId).then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found!'
                    });
                }

                return res.status(200).json({
                    courseCount,
                    learningPathCount,
                    inProgressCount: user.inProgressCourses.length,
                    bookmarkCount: user.bookmarkedCourses.length,
                    completeCount: user.finishedCourses.length
                });
            })
        });
    });
});

export default router;