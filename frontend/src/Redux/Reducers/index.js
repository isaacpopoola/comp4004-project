import { combineReducers } from "redux";
import { login } from "./login";
import { students } from "./students";
import { courses } from "./courses";

const rootReducer = combineReducers({ login, students, courses });

export default rootReducer;
