import blogService from "../services/blogs";
import { showNotification } from "../reducers/notificationReducer";

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
      dispatch(showNotification(` ${blog.title} has been added`, "success"));
    } catch (exception) {
      dispatch(showNotification(`cannot create blog ${blog.title}`, "error"));
    }
  };
};
