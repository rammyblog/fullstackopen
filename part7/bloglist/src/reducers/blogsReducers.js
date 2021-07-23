import blogService from "../services/blogs";

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

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "FETCH_BLOGS",
        data: blogs,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: "ADD_BLOG",
        data: newBlog,
      });
      const status = "success";
      const message = `${newBlog.title} has been added`;
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: { message, status },
      });
    } catch (e) {
      const message = e.message;
      const status = "error";
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: { message, status },
      });
    }
  };
};

export default blogReducer;
