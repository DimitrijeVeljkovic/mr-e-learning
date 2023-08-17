import { Course } from "./course";

export interface CompletedCourse {
    course: Course;
    dateFinished: string;
    percentage: number;
    notes: string[];
}
