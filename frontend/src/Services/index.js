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
    register: (body) =>
        ApiInstance.post("/register", body).catch((err) => err.response),
    fetchAvailableCourses: () =>
        ApiInstance.get("/course/available").catch((err) => err.response),
    fetchAllCourses: () =>
            ApiInstance.get("/course/all").catch((err) => err.response),
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
    createStudent: (name, username, password) =>
        ApiInstance.post("/register", {
            username,
            password,
            name,
            type: "Student",
        }).catch((err) => err.response),
    cancelCourse: (courseCode) =>
        ApiInstance.post("/cancel_course", {
            course_code: courseCode,
        }).catch((err) => err.response),
    fetchEnrolledCourses: () =>
        ApiInstance.get("/course/me").catch((err) => err.response),
    createCourse: (
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
    ) =>
        ApiInstance.post("/course", {
            course_code,
            profId: 1,
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
            section: "A",
            prereqs,
        }),
    submitDeliverable: (deliverable_id, submission) => 
        ApiInstance.post("/submit_deliverable", {
            deliverable_id,
            submission
        }),
    getStudentBalance: () => ApiInstance.get("/students/me")
};

export default api;
