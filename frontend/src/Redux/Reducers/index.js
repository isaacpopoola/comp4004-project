import { combineReducers } from "redux";
import { login } from "./login";
import { students } from "./students";
import { courses } from "./courses";
import { enrolledCourses } from "./enrolledCourses";

const rootReducer = combineReducers({
    login,
    students,
    courses,
    enrolledCourses,
});

export default rootReducer;
