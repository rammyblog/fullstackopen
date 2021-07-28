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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: "DELETE_BLOG",
        data: blog,
      });
      dispatch(showNotification(` ${blog.title} has been deleted`, "success"));
    } catch (error) {
      dispatch(showNotification(`cannot delete blog ${blog.title}`, "error"));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.edit(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch({
        type: "LIKE_BLOG",
        data: updatedBlog,
      });
      dispatch(showNotification(` ${blog.title} has been liked`, "success"));
    } catch (error) {
      dispatch(showNotification(`cannot like blog ${blog.title}`, "error"));
    }
  };
};

export const addComment = (id, text) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, text);
      dispatch({
        type: "ADD_COMMENT",
        data: updatedBlog,
      });
      dispatch(
        showNotification(`Comment has been added successfully`, "success")
      );
    } catch (error) {
      console.error(error);
      dispatch(showNotification(`Could not add comment`, "error"));
    }
  };
};
