

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};



export default blogReducer;
