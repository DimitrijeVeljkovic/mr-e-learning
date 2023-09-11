import { Comment } from "./comment";
import { Question } from "./question";
import { Rating } from "./rating";
import { Section } from "./section";

export interface Course {
    _id: string;
    courseId: number;
    title: string;
    description: string;
    imageUrl: string;
    sections?: Section[];
    ratings: Rating[];
    comments?: Comment[];
    questions?: Question[];
}