const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Hello world, Yeah",
    author: "Onasanya Tunde",
    url: "https://www.tunde.com/",
    likes: 7,
  },
  {
    title: "Harmful content",
    author: "Harmfuls",
    url: "http://www.google.com",
    likes: 5,
  },
];
const initialUser = {
  name: "Onasanya",
  username: "rammyblog",
  password: "rammyblog",
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const { body } = await api.post("/api/users/").send(initialUser);

  const blogObjects = initialBlogs.map((blog) => {
    blog.user = body.id;
    return new Blog(blog);
  });
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id parameter is defined", async () => {
  const response = await api.get("/api/blogs");
  const singleBlog = response.body[0];
  expect(singleBlog.id).toBeDefined();
});

test("creation of a blog post is possible", async () => {
  const singleBlog = {
    title: "New post",
    author: "Onasanya Tunde",
    url: "https://www.tunde.com/",
    likes: 7,
  };
  const { body } = await api.post("/api/login/").send(initialUser);
  const { token } = body;
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(singleBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogAfter = await Blog.find({});
  expect(blogAfter.length).toBe(initialBlogs.length + 1);
  const titles = blogAfter.map((blog) => blog.title);
  expect(titles).toContain(singleBlog.title);
});

test("Creation of blog post with 0 likes", async () => {
  const newPost = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };
  const { body } = await api.post("/api/login/").send(initialUser);
  const { token } = body;
  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const id = res.body.id;
  expect(res.body.likes).toBe(0);
  const dbBlog = await Blog.findOne({ _id: id });
  expect(dbBlog.likes).toBe(0);
});

test("creation of a blog post without title and url will fail", async () => {
  const singleBlog = {
    author: "Onasanya Tunde",
    url: "https://www.tunde.com/",
  };
  await api.post("/api/blogs").send(singleBlog).expect(400);
});

test("Test deleting a single blog", async () => {
  const response = await api.get("/api/blogs");
  const { body } = await api.post("/api/login/").send(initialUser);
  const { token } = body;
  const { id } = response.body[0];
  await api
    .delete(`/api/blogs/${id}/`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
  const blogAfter = await Blog.find({});
  expect(blogAfter.length).toBe(initialBlogs.length - 1);
});

test("Test editing a single blog", async () => {
  const singleBlog = {
    title: "New post",
    author: "Onasanya Tunde",
    url: "https://www.tunde.com/",
    likes: 7,
  };
  const response = await api.get("/api/blogs");
  const { id } = response.body[0];
  await api.put(`/api/blogs/${id}/`).send(singleBlog).expect(200);
  const blogAfter = await Blog.findById(id);
  expect(blogAfter.title).toBe(singleBlog.title);
  expect(blogAfter.author).toBe(singleBlog.author);
  expect(blogAfter.url).toBe(singleBlog.url);
  expect(blogAfter.likes).toBe(singleBlog.likes);
});

afterAll(() => {
  mongoose.connection.close();
});
