import { Course } from "./course";

export interface CompletedCourse {
    course: Course;
    date: string;
    percentage: number;
}
