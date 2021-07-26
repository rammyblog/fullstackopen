import blogService from "../services/blogs";
import loginService from "../services/login";

import { showNotification } from "./notificationReducer";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default authReducer;

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({ type: "LOGIN", payload: user });
    }
  };
};
export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      dispatch(showNotification("Login Success", "success"));
    } catch (exception) {
      dispatch(showNotification("wrong credentials", "error"));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem("loggedBloglistUser");
      dispatch({ type: "LOGOUT" });
      dispatch(showNotification("Logout Success", "success"));
    } catch (exception) {
      dispatch(showNotification("Something went wrong", "error"));
    }
  };
};
