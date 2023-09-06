import { User } from "./user";

export interface Comment {
    _id?: string;
    commentId: number;
    comment: string;
    user: User
}
