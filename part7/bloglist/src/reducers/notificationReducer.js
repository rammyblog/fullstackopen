const notificationReducer = (
  state = {
    message: "",
    status: "",
  },
  action
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { ...action.data };
    case "HIDE_NOTIFICATION":
      return {
        message: "",
        status: "",
      };
    default:
      return state;
  }
};

export const showNotification = (message, status) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: { message, status },
    });
    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
    }, 2000);
  };
};

export default notificationReducer;
