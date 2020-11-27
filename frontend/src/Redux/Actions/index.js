import api from "../../Services/";
import { toast } from "react-toastify";

export const attemptLogin = (body) => async (dispatch) => {
    const response = await api.login(body);

    if (response.status >= 400) {
        dispatch({ type: "LOGIN_FAILED" });
    } else if (response.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS" });
    }
    return Promise.resolve();
};

export const fetchAllCourses = () => async (dispatch) => {
    const response = await api.fetchAllCourses();

    if (response.status >= 400) {
        dispatch({ type: "FETCH_ALL_COURSES_FAILED" });
    } else if (response.status === 200) {
        dispatch({
            type: "FETCH_ALL_COURSES_SUCCESS",
            payload: response.data.courses,
        });
    }
    return Promise.resolve();
};

export const enrollInClass = (courseCode) => async (dispatch) => {
    const response = await api.enrollInClass(courseCode);

    if (response.status >= 400) {
        dispatch({ type: "ENROLL_CLASS_FAILED" });
    } else if (response.status === 200) {
        toast.success(`Enrolled in ${courseCode}`);
        dispatch({
            type: "ENROLL_CLASS_SUCCESS",
            payload: response.data.courses,
        });
    }
    return Promise.resolve();
};

export const dropClass = (courseCode) => async (dispatch) => {
    const response = await api.dropClass(courseCode);

    if (response.status >= 400) {
        dispatch({ type: "DROP_CLASS_FAILED" });
    } else if (response.status === 200) {
        toast.success(`Dropped class ${courseCode}`);
        dispatch({
            type: "DROP_CLASS_SUCCESS",
            payload: response.data.courses,
        });
    }
    return Promise.resolve();
};
