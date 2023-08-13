import express from 'express';
import Course from '../models/course.mjs';
import tokenCheckMiddleware from '../middleware/token-check.mjs';

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

export default router;