const { postService } = require('../services');
const httpStatus = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  const post = req.body;
  const userId = req.user.id;
  try {
    const { status, data } = await postService.createPost(post, userId);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  const { status, data } = await postService.getAllPosts();

  res.status(httpStatus[status]).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getPostById(id);

  res.status(httpStatus[status]).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const userId = req.user.id;
  
  if (!post.title || !post.content) {
    return res.status(httpStatus.INVALID_VALUE)
      .json({ message: 'Some required fields are missing' });
  }

  const { status, data } = await postService.updatePost(id, post, userId);
  
  res.status(httpStatus[status]).json(data);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};