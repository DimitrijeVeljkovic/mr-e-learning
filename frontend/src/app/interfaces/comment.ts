import { User } from "./user";

export interface Comment {
    commentId: number;
    comment: string;
    user: User
}
