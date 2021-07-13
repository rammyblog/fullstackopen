const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.notification;
    case "HIDE_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (notification, displayTime) => {

  return {
    type: "NEW_NOTIFICATION",
    notification,
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
    notification: null,
  };
};

// export const voteAnecdote = (id) => {
//     return {
//       type: "VOTE_ANECDOTE",
//       id,
//     };
//   };
export default notificationReducer;
