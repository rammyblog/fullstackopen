import React from "react";

const BlogDetail = ({ blog, handleEditBlog }) => {
  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} likes{" "}
          <button onClick={() => handleEditBlog(blog)}>Like</button>
          <p>added by {blog.author}</p>
        </>
      ) : null}
    </div>
  );
};

export default BlogDetail;
