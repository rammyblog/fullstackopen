const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("comments");
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
  request.body.user = request.user._id;

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

blogRouter.post("/:id/comments", async (request, response) => {
  console.log("here");
  const id = request.params.id;
  const { text } = request.body;
  if (!text) {
    return response.status(400).end();
  }
  const comment = new Comment(request.body);
  const blog = await Blog.findById(id).populate("comments");
  comment.blog = blog;
  const newComment = await comment.save();
  blog.comments = blog.comments.concat(newComment._id);
  await blog.save();
  const savedBlog = await Blog.findById(id).populate("comments");

  response.status(200).json(savedBlog);
});

module.exports = blogRouter;
