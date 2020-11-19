import api from "../../Services/";

export const attemptLogin = (body) => async (dispatch) => {
    const response = await api.login(body);

    if (response.status >= 400) {
        dispatch({ type: "LOGIN_FAILED" });
    } else if (response.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS" });
    }
    return Promise.resolve();
};
