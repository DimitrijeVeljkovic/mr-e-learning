import { Course } from "./course";

export interface LearningPath {
    _id: string;
    learningPathId: number;
    title: string;
    lpCourses: {
        learningPathCourseId: number;
        course: Course;
    }[];
    imageUrl: string;
}
