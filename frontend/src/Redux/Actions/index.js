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

export const fetchAvailableCourses = () => async (dispatch) => {
    const response = await api.fetchAvailableCourses();

    if (response.status >= 400) {
        dispatch({ type: "FETCH_AVAILABLE_COURSES_FAILED" });
    } else if (response.status === 200) {
        dispatch({
            type: "FETCH_AVAILABLE_COURSES_SUCCESS",
            payload: response.data.courses,
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
    return Promise.resolve();
};

export const fetchEnrolledCourses = () => async (dispatch) => {
    const response = await api.fetchEnrolledCourses();

    if (response.status >= 400) {
        dispatch({ type: "FETCH_ENROLLED_COURSES_FAILED" });
    } else if (response.status === 200) {
        dispatch({
            type: "FETCH_ENROLLED_COURSES_SUCCESS",
            payload: response.data.courses,
        });
    }
    return Promise.resolve();
};

export const enrollInClass = (courseCode) => async (dispatch) => {
    const response = await api.enrollInClass(courseCode);

    if (response.status >= 400) {
        toast.error(response.data.message);
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

export const deleteStudentByUsername = (username) => async (dispatch) => {
    const response = await api.deleteStudentByUsername(username);

    if (response.status >= 400) {
        toast.error(
            `Student ${username} could not be deleted, please try again`
        );
        dispatch({
            type: "DELETE_STUDENT_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        dispatch({
            type: "DELETE_STUDENT_SUCCESS",
            payload: username,
        });
        toast.success(`Student ${username} successfully deleted`);
    }
    return Promise.resolve();
};

export const createStudent = (name, username, password) => async (dispatch) => {
    const response = await api.createStudent(name, username, password);

    if (response.status >= 400) {
        toast.error(
            `Student ${username} could not be created, please try again`
        );
        dispatch({
            type: "CREATE_STUDENT_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        toast.success(`Student ${username} successfully created`);
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
        toast.error(`Failed to dropped class ${courseCode}`);
        dispatch({ type: "DROP_CLASS_FAILED" });
    } else if (response.status === 200) {
        toast.success(`Dropped class ${courseCode}`);
        dispatch({
            type: "DROP_CLASS_SUCCESS",
            payload: courseCode,
        });
    }
    return Promise.resolve();
};

export const cancelCourse = (courseCode) => async (dispatch) => {
    const response = await api.cancelCourse(courseCode);

    if (response.status >= 400) {
        toast.error(`Failed to canceled course ${courseCode}`);
        dispatch({ type: "CANCEL_COURSE_FAILED" });
    } else if (response.status === 200) {
        toast.success(`Canceled course ${courseCode}`);
        dispatch({
            type: "CANCEL_COURSE_SUCCESS",
            payload: response.data.courses,
        });
    }
    return Promise.resolve();
};

export const createCourse = (
    course_code,
    course_name,
    course_descr,
    course_registration_deadline,
    course_drop_deadline,
    course_student_limit,
    course_credits,
    price,
    course_duration,
    course_time,
    course_day,
    prereqs
) => async (dispatch) => {
    const response = await api.createCourse(
        course_code,
        course_name,
        course_descr,
        course_registration_deadline,
        course_drop_deadline,
        course_student_limit,
        course_credits,
        price,
        course_duration,
        course_time,
        course_day,
        prereqs
    );

    if (response.status >= 400) {
        toast.error(
            `Course ${course_code} could not be created, please try again`
        );
        dispatch({
            type: "CREATE_COURSE_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        toast.success(`Course ${course_code} successfully created`);
        dispatch({
            type: "CREATE_COURSE_SUCCESS",
            payload: course_code,
        });
    }
    return Promise.resolve();
};

export const submitDeliverable = (deliverable_id, submission) => async (dispatch) => {
    const response = await api.submitDeliverable(deliverable_id, submission);

    if (response.status >= 400) {
        toast.error(`Deliverable could not be submitted`);
        dispatch({
            type: "SUBMIT_DELIVERABLE_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        toast.success(`Deliverable has been successfully submitted`);
        dispatch({
            type: "SUBMIT_DELIVERABLE_SUCCESS",
            payload: (response.data || {}).message,
        });
    }

    return Promise.resolve();
}

export const getStudentBalance = () => async (dispatch) => {
    const response = await api.getStudentBalance();

    if (response.status >= 400) {
        toast.error(`Error retrieving balance`);
        dispatch({
            type: "FETCH_STUDENT_BALANCE_FAILED",
            payload: (response.data || {}).message,
        });
    } else if (response.status === 200) {
        dispatch({
            type: "FETCH_STUDENT_BALANCE_SUCCESS",
            payload: response.data,
        });
    }
    
    return Promise.resolve();
}
