import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
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
  const blogFormRef = useRef();

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

  const handleEditBlog = async (id) => {
    try {
      const blogsClone = [...blogs];
      const oldBlog = blogsClone.find((obj) => obj.id === id);
      oldBlog.likes += 1;
      const blog = await blogService.edit(id, oldBlog);
      setBlogs(blogsClone);
      handleNotifications(`${blog.title} has been liked`, "success");
    } catch (error) {
      handleNotifications(error.message, "error");
    }
  };
  const handleDeleteBlog = async ({ id, title }) => {
    try {
      const blogsClone = [...blogs];
      await blogService.remove(id);
      setBlogs(blogsClone.filter((obj) => obj.id !== id));
      handleNotifications(`${title} has been removed`, "success");
    } catch (error) {
      console.log({ error });
      handleNotifications(error.response.data.error, "error");
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

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
