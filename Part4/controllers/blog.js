const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, url, author } = request.body;
  if (!title || !url || !author) {
    return response.status(400).end();
  }
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
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
