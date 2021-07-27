import React from "react";
import { Link } from "react-router-dom";
// import Togglable from "./Togglable";
const Blog = ({ blog }) => {
  // const handleDeleteBlogConfirmation = () => {
  //   if (window.confirm(`remove blog ${blog.title} by ${blog.author}!`)) {
  //     handleDeleteBlog(blog);
  //   }
  // };

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      {/* <Togglable buttonLabel="view" hideBtnLabel="hide"> */}
      {/* <div>
        <p className="url">
          {blog.url} <br />
        </p>
        <p className="likes">
          Likes {blog.likes}
          <button
            className="likeButton"
            id="like"
            onClick={() => handleEditBlog(blog)}
          >
            like
          </button>{" "}
          <br />{" "}
        </p>
        <p className="author">{blog.author}</p>
        <button
          className="deleteBtn"
          id="delete"
          onClick={() => handleDeleteBlogConfirmation(blog)}
        >
          delete
        </button>
      </div> */}
      {/* </Togglable> */}
    </div>
  );
};

export default Blog;
