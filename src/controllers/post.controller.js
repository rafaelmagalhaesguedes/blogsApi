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
  try {
    const { status, data } = await postService.getAllPosts();
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INVALID_VALUE).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};