import express from 'express';
import LearningPath from '../models/learning-path.mjs';

const router = express.Router();

router.get('', (req, res, next) => {
    LearningPath.aggregate([
        {
            $lookup: {
                from: 'courses',
                localField: 'courses',
                foreignField: '_id',
                as: 'courses'
            }
        }
    ]).then(learningPaths => {
        res.status(200).json({
            learningPaths
        });
    })
});

export default router;