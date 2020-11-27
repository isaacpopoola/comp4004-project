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
    fetchAllCourses: () =>
        ApiInstance.get("/courses/available").catch((err) => err.response),
};

export default api;
