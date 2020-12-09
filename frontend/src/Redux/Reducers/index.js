import { combineReducers } from "redux";
import { login } from "./login";
import { students } from "./students";
import { courses } from "./courses";
import { enrolledCourses } from "./enrolledCourses";
import { studentBalance } from "./studentBalance";

const rootReducer = combineReducers({
    login,
    students,
    courses,
    enrolledCourses,
    studentBalance
});

export default rootReducer;
