const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, url, author } = request.body;
  if (!title || !url || !author) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;
  request.body.user = user._id;
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;
  const blog = await Blog.findById(id);
  console.log(blog);
  if (user._id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: "You are not authorized to delete this blog" });
  }
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { title, url, author, likes } = request.body;
  if (!title && !url && !author && !likes) {
    return response.status(400).end();
  }

  const editedBlog = await Blog.findOneAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  );
  response.status(200).json(editedBlog);
});

module.exports = blogRouter;
