/* eslint-disable no-case-declarations */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    case "LIKE_BLOG":
      const id = action.data.id;
      const updatedBlog = state.find((blog) => blog.id === id);
      const changedBlog = {
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));

    case "ADD_COMMENT":
      return state.map((blog) => (blog.id !== id ? blog : action.data));
    default:
      return state;
  }
};

export default blogReducer;
