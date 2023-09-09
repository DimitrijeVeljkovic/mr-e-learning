import { Course } from "./course";

export interface InProgressCourse {
    course: Course;
    notes: { noteId: number, note: string }[];
}
