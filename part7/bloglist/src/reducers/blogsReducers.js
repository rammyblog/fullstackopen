const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export default blogReducer;
