import { combineReducers } from "redux";
import { login } from "./login";
import { students } from "./students";

const rootReducer = combineReducers({ login, students });

export default rootReducer;
