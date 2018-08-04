import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReduce";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
