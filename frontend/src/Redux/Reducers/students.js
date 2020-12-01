export const students = (state = [], action) => {
    switch (action.type) {
        case "FETCH_STUDENTS_SUCCESS":
            return action.payload;
        case "DELETE_STUDENT_SUCCESS":
            const idx = state.findIndex(
                (student) => student.username === action.payload
            );
            if (idx > -1) {
                state.splice(idx, 1);
                return [...state];
            }
        default:
            return state;
    }
};
