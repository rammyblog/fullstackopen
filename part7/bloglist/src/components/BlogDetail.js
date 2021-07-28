import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../actions/blogActions";

const BlogDetail = ({ blog, handleEditBlog }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleCommentSubmit = () => {
    dispatch(addComment(blog.id, comment));
  };

  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a> <br />
          {blog.likes} likes{" "}
          <button onClick={() => handleEditBlog(blog)}>Like</button>
          <p>added by {blog.author}</p>
          <p>Comments</p>
          <input
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />{" "}
          <button onClick={handleCommentSubmit}>add comment</button>
          <ul>
            {blog.comments &&
              blog.comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default BlogDetail;
