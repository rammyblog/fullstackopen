import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { loginUser, initUser } from "./reducers/authReducer";
import {
  fetchBlogs,
  addBlog,
  deleteBlog,
  likeBlog,
} from "./actions/blogActions";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initUser());
  }, []);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const handleAddToBlog = (newBlog) => {
    dispatch(addBlog(newBlog));
  };

  const handleEditBlog = (blog) => {
    dispatch(likeBlog(blog));
  };
  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlog(blog));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-btn">
        login
      </button>
    </form>
  );
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {notifications.message && notifications.status ? (
        <Notification {...notifications} />
      ) : null}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <Togglable
            buttonLabel="create new blog"
            hideBtnLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm handleAddToBlog={handleAddToBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div style={blogStyle} key={blog.id}>
                <Blog
                  blog={blog}
                  handleEditBlog={handleEditBlog}
                  handleDeleteBlog={handleDeleteBlog}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
