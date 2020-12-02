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
        toast.success(`Studednt ${username} successfully deleted`);
    }
    return Promise.resolve();
};

export const createStudent = ({ name, username, password }) => async (
    dispatch
) => {
    const response = await api.deleteStudentByUsername({
        name,
        username,
        password,
    });

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
};
