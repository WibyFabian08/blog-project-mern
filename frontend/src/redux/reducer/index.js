import { combineReducers } from "redux";
import postState from "./postReducer";
import authState from "./authReducer";

const reducer = combineReducers({
  postState,
  authState,
});

export default reducer;
