import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Course from './models/course.mjs';
import LearningPath from './models/learning-path.mjs';
import User from './models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tokenCheckMiddleware from './middleware/token-check.mjs';

const app = express();

mongoose.connect('mongodb+srv://dimitrijeveljkovic2:egUArpjJI8tPFrNp@cluster0.u1dcews.mongodb.net/mr-e-learning?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/api/courses', (req, res, next) => {
  Course.find().then(courses => {
    res.status(200).json({
      courses
    });
  });
});

app.post('/api/courses/:courseId/add-rating', tokenCheckMiddleware, (req, res, next) => {
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

app.post('/api/courses/:courseId/add-comment', tokenCheckMiddleware, (req, res, next) => {
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

app.get('/api/learning-paths', (req, res, next) => {
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
    })
  })
});

app.post('/api/user/signup', (req, res, next) => {
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

app.post('/api/user/login', (req, res, next) => {
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
        token: token
      });
    })
    .catch(error => {
      return res.status(401).json({
        message: "Auth failed!"
      });
    });
});

export default app;
