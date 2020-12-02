export const courses = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_COURSES_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};
