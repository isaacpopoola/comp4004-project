import axios from "axios";

const ApiInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    withCredentials: true,
});

const api = {
    login: (body) =>
        ApiInstance.post("/login", { ...body, type: "Student" }).catch(
            (err) => err.response
        ),
    fetchAllCourses: () =>
        ApiInstance.get("/course/available").catch((err) => err.response),
    enrollInClass: (courseCode) =>
        ApiInstance.post("/course_registration", {
            course_code: courseCode,
        }).catch((err) => err.response),
    dropClass: (courseCode) =>
        ApiInstance.post("/drop_course", { course_code: courseCode }).catch(
            (err) => err.response
        ),
    getStudents: () =>
        ApiInstance.get("/students/all").catch((err) => err.response),
    deleteStudentByUsername: (username) =>
        ApiInstance.post("/delete_student", { username }).catch(
            (err) => err.response
        ),
    createStudent: ({ username, password, name }) => {
        ApiInstance.post("/register", {
            username,
            password,
            name,
            type: "Student",
        }).catch((err) => err.response);
    },
    cancelCourse: ({courseCode}) => {
        ApiInstance.post("/cancel_course", {
            course_code: courseCode
        }).catch((err) => err.response);
    },
    fetchEnrolledCourses: () =>
        ApiInstance.get("/course/me").catch((err) => err.response),
};

export default api;
