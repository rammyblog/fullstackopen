import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { fetchBlogs, addBlog } from "./reducers/blogsReducers";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notifications = useSelector((state) => state.notifications);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleAddToBlog = (newBlog) => {
    dispatch(addBlog(newBlog));
  };

  const handleEditBlog = async (id) => {
    try {
      const blogsClone = [...blogs];
      const oldBlog = blogsClone.find((obj) => obj.id === id);
      oldBlog.likes += 1;
      // const blog = await blogService.edit(id, oldBlog);
      // setBlogs(blogsClone);
      // handleNotifications(`${blog.title} has been liked`, "success");
    } catch (error) {
      // handleNotifications(error.message, "error");
    }
  };
  const handleDeleteBlog = async ({ id, title }) => {
    try {
      // const blogsClone = [...blogs];
      console.log(id, title);
      await blogService.remove(id);
      // setBlogs(blogsClone.filter((obj) => obj.id !== id));
      // handleNotifications(`${title} has been removed`, "success");
    } catch (error) {
      console.log({ error });
      // handleNotifications(error.message, "error");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNotification("wrong credentials", "error"));
    }
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
