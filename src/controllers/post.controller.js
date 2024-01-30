const { postService } = require('../services');
const statusHTTP = require('../utils/mapStatusHTTP');
const httpStatus = require('../utils/mapStatusHTTP');

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
    return res.status(statusHTTP.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { status, data } = await postService.getPostById(req.params.id);
    res.status(httpStatus[status]).json(data);
  } catch (error) {
    return res.status(statusHTTP.INTERNAL_ERROR).json({ message: error.message });
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
  const { q } = req.query;
  try {
    const { status, data } = await postService.searchPosts(q);
    res.status(statusHTTP[status]).json(data);
  } catch (error) {
    return res.status(statusHTTP.INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts };