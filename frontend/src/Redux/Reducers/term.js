export const term = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_TERM_DATES":
            return action.payload;
        default:
            return state;
    }
};
