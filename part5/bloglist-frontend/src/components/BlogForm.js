import React, { useState } from "react";

const BlogForm = ({ handleAddToBlog }) => {
  const [formDetails, setFormDetails] = useState({
    title: "",
    author: "",
    url: "",
  });
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToBlog(formDetails);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={formDetails.title}
            name="title"
            onChange={handleFormChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={formDetails.author}
            name="author"
            onChange={handleFormChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={formDetails.url}
            name="url"
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
