const Comment = require("../models/Comment");
const commentRouter = require("express").Router();


commentRouter.post("/", async (request, response) => {
  const { text, blog } = request.body;
  if (!text || !blog) {
    return response.status(400).end();
  }
  const comment = new Comment(request.body);
  const newComment = await comment.save();
  response.status(201).json(newComment);
});
