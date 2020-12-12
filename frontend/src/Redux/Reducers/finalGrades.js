export const finalGrades = (state = [], action) => {
    switch (action.type) {
        case "FETCH_FINAL_GRADES_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};
