const { postService } = require('../services');
const { httpStatus } = require('../utils/httpStatus');

const createPost = async (req, res) => {
  try {
    const { status, data } = await postService.createPost(req.body, req.user.id);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { status, data } = await postService.getAllPosts();
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { status, data } = await postService.getPostById(req.params.id);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_ERROR).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { status, data } = await postService.updatePost(req.params.id, req.body, req.user.id);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { status, data } = await postService.deletePost(req.params.id, req.user.id);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { status, data } = await postService.searchPosts(req.query.q);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts };