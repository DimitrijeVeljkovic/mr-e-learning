import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    comments: [{ 
        userName: String, 
        comment: String 
    }],
    ratings: [{ 
        userName: String,
        rating: Number }],
    sections: [{ 
        title: String,
        paragraphs: [String],
        videoUrl: String
    }],
    finalTest: [{
        question: String,
        options: [String],
        correctAnswer: String
    }]
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
