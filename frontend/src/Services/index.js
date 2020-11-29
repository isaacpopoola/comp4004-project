import axios from "axios";

const ApiInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
});

const api = {
    login: (body) =>
        ApiInstance.post("/login", { ...body, type: "Student" }).catch(
            (err) => err.response
        ),
    getStudents: () =>
        ApiInstance.get("/students/all").catch((err) => err.response),
    deleteStudentByUsername: (username) =>
        ApiInstance.post("/delete_student", { username }).catch(
            (err) => err.response
        ),
    createStudent: ({username, password, name}) => {
        ApiInstance.post("/register", {username, password, name, type: "Student"}).catch(
            (err) => err.response
        )
    }
};

export default api;
