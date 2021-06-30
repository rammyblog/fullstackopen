import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationObj, setNotificationObj] = useState({
    message: "",
    status: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleNotifications = (message, status) => {
    setNotificationObj({
      message,
      status,
    });
    setTimeout(() => {
      setNotificationObj({
        message: "",
        status: "",
      });
    }, 5000);
  };

  const handleAddToBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      handleNotifications(`${blog.title} has been added`, "success");
    } catch (error) {
      handleNotifications(error.message, "error");
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
      handleNotifications("wrong credentials", "error");
    }
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      {notificationObj.message && notificationObj.status ? (
        <Notification {...notificationObj} />
      ) : null}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <BlogForm handleAddToBlog={handleAddToBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
