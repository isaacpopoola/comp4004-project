import { combineReducers } from "redux";
import { login } from "./login";
import { students } from "./students";
import { availableCourses, allCourses } from "./courses";
import { enrolledCourses } from "./enrolledCourses";
import { studentBalance } from "./studentBalance";
import { finalGrades } from "./finalGrades";
import { term } from "./term";

const rootReducer = combineReducers({
    login,
    students,
    availableCourses,
    allCourses,
    enrolledCourses,
    studentBalance,
    finalGrades,
    term,
});

export default rootReducer;
