import axios from "axios";
import { showNotification } from "./notificationReducer";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.data;

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

export default userReducer;
