import mongoose from 'mongoose';

const learningPathSchema = mongoose.Schema({
    title: String,
    courses: [String],
    imageUrl: String
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);

export default LearningPath;