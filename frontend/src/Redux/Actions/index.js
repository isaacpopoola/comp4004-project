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

export const fetchStudents = () => async (dispatch) => {
    const response = await api.getStudents();

    if (response.status >= 400) {
        dispatch({ type: "FETCH_STUDENTS_FAILED" });
    } else if (response.status === 200) {
        dispatch({
            type: "FETCH_STUDENTS_SUCCESS",
            payload: response.data.students,
        });
    }
    return Promise.resolve();
};

export const deleteStudentByUsername = (username) => async (dispatch) => {
    const response = await api.deleteStudentByUsername(username);

    if (response.status >= 400) {
        dispatch({
            type: "DELETE_STUDENT_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        dispatch({
            type: "DELETE_STUDENT_SUCCESS",
            payload: username,
        });
    }
    return Promise.resolve();
};

export const createStudent = ({ name, username, password }) => async (dispatch) => {
    const response = await api.deleteStudentByUsername({name, username, password, });

    if (response.status >= 400) {
        dispatch({
            type: "CREATE_STUDENT_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        dispatch({
            type: "CREATE_STUDENT_SUCCESS",
            payload: username,
        });
    }
    return Promise.resolve();
};

