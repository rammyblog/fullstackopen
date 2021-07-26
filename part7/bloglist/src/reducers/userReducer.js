import axios from "axios";
import { showNotification } from "./notificationReducer";

const userReducer = (state = { users: [], user: null }, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, users: action.data };
    case "FETCH_USER":
      return state.users.filter((user) => user.id === action.id);
    default:
      return state;
  }
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/users");
      dispatch({ type: "FETCH_USERS", data: res.data });
    } catch (error) {
      dispatch(showNotification("Something went wrong", "error"));
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_USER", id });
    } catch (error) {
      dispatch(showNotification("Something went wrong", "error"));
    }
  };
};

export default userReducer;
