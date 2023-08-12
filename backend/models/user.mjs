import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    inProgressCourses: [{
        courseId: String,
        notes: [String]
    }],
    bookmarkedCourses: [String],
    finishedCourses: [{
        courseId: String,
        notes: [String]
    }]
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;