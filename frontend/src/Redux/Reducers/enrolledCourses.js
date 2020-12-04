export const enrolledCourses = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ENROLLED_COURSES_SUCCESS":
            return action.payload;
        case "DROP_CLASS_SUCCESS":
            const idx = state.findIndex(
                (course) => course.course_code === action.payload
            );
            if (idx > -1) {
                state.splice(idx, 1);
                return [...state];
            }
        default:
            return state;
    }
};
