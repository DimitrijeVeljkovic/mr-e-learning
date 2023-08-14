import { Question } from "./question";
import { Rating } from "./rating";
import { Section } from "./section";

export interface Course {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    sections: Section[];
    ratings: Rating[];
    comments: Comment[];
    finalTest: Question[];
}