import { combineReducers } from "redux";
import { auth } from "./auth";
import { message } from "./message";
import { chat } from "./chat";

export const rootReducers = combineReducers({
  auth,
  message,
  chat,
});
