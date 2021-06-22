const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  if (blogs.length === 1) {
    return blogs[0].likes;
  }
  return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const likes = blogs.map((blog) => blog.likes);
  return blogs[likes.indexOf(Math.max(...likes))];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const result = [];
  blogs.forEach((blog) => {
    const exist = result.find((b) => b.author === blog.author);
    if (exist) {
      exist.blogs += 1;
    } else {
      result.push({ author: blog.author, blogs: 1 });
      // console.log(result);
    }
  });
  const authorWithMostBlogsInt = result.map((author) => author.blogs);
  return result[
    authorWithMostBlogsInt.indexOf(Math.max(...authorWithMostBlogsInt))
  ];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const result = [];
  blogs.forEach((blog) => {
    const exist = result.find((b) => b.author === blog.author);
    if (exist) {
      exist.likes += blog.likes;
    } else {
      result.push({ author: blog.author, likes: blog.likes });
    }
  });
  const authorWithMostLikesInt = result.map((author) => author.likes);
  return result[
    authorWithMostLikesInt.indexOf(Math.max(...authorWithMostLikesInt))
  ];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
