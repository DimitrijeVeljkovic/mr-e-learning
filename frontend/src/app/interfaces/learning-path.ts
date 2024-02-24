import { Course } from "./course";

export interface LearningPath {
    learningPathId: number;
    title: string;
    lpCourses: {
        learningPathCourseId: number;
        course: Course;
    }[];
    imageUrl: string;
}
