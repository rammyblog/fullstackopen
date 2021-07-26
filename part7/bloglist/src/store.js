import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./reducers/blogsReducers";
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  auth: authReducer,
  users: userReducer,
});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
