import mongoose from 'mongoose';

const learningPathSchema = mongoose.Schema({
    title: String,
    courses: [String]
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

export default LearningPath;