import React from "react";
const Blog = ({ blog, handleEditBlog, handleDeleteBlog }) => {
  const handleDeleteBlogConfirmation = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}!`)) {
      handleDeleteBlog(blog);
    }
  };

  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{" "}
        <button onClick={() => handleEditBlog(blog.id)}>like</button>
      </p>
      <p>{blog.author}</p>
      <button onClick={() => handleDeleteBlogConfirmation()}>Delete</button>
    </div>
  );
};

export default Blog;
