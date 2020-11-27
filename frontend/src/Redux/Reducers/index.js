import { combineReducers } from "redux";
import { login } from "./login";
import { courses } from "./courses";

const rootReducer = combineReducers({ login, courses });

export default rootReducer;
