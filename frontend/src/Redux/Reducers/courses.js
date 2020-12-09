export const availableCourses = (state = [], action) => {
    switch (action.type) {
        case "FETCH_AVAILABLE_COURSES_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};

export const allCourses = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_COURSES_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};
