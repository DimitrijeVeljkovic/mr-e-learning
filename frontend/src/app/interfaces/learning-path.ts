import { Course } from "./course";

export interface LearningPath {
    _id: string;
    title: string;
    courses: Course[];
    imageUrl: string;
}
