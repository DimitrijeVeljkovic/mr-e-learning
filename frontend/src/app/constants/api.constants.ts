const BASE_URL = 'http://localhost:8080/api';

const USER_URL = `${BASE_URL}/user`;
const COURSES_URL = `${BASE_URL}/courses`;
const LEARNING_PATHS_URL = `${BASE_URL}/learning-paths`;
const NOTES_URL = `${BASE_URL}/notes`;
const RATING_URL = `${BASE_URL}/rating`;
const COMMENT_URL = `${BASE_URL}/comment`;

export const API_ROUTES = {
    USER: {
        BASE: USER_URL,
        LOGIN: `${USER_URL}/login`,
        SIGNUP: `${USER_URL}/signup`
    },
    COURSES: {
        BASE: COURSES_URL,
        BOOKMARK: `${COURSES_URL}/bookmark`,
        IN_PROGRESS: `${COURSES_URL}/in-progress`,
        FINISH: `${COURSES_URL}/finish`,
        COUNT: `${COURSES_URL}/count`,
        SUBMIT: `${COURSES_URL}/submit`
    },
    LEARNING_PATHS: {
        BASE: LEARNING_PATHS_URL
    },
    NOTES: {
        BASE: NOTES_URL
    },
    RATING: {
        BASE: RATING_URL
    },
    COMMENT: {
        BASE: COMMENT_URL
    },
}