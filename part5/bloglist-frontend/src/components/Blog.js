import React from "react";
const Blog = ({ blog, handleEditBlog }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{" "}
        <button onClick={() => handleEditBlog(blog.id)}>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );
};

export default Blog;
