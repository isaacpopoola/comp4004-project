export const login = (state = { loggedIn: false }, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { loggedIn: true };
        case "LOGIN_FAILED":
            return state;
        default:
            return state;
    }
};
