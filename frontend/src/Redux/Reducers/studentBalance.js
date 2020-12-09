export const studentBalance = (state = [], action) => {
    switch (action.type) {
        case "FETCH_STUDENT_BALANCE_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};
