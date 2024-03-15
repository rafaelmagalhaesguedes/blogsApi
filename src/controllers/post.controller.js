const { postService } = require('../services');
const { httpStatus } = require('../utils/httpStatus');

const createPost = async (req, res) => {
  //
  const { status, data } = await postService.createPost(req.body, req.user.id);
  res.status(httpStatus[status]).json(data);
};

const getAllPosts = async (_req, res) => {
  //
  const { status, data } = await postService.getAllPosts();
  res.status(httpStatus[status]).json(data);
};

const getPostsByUserId = async (req, res) => {
  //
  const { status, data } = await postService.getPostsByUserId(req.user.id);
  res.status(httpStatus[status]).json(data);
};

const getPostById = async (req, res) => {
  //
  const { status, data } = await postService.getPostById(req.params.id);
  res.status(httpStatus[status]).json(data);
};

const updatePost = async (req, res) => {
  //
  const { status, data } = await postService.updatePost(req.params.id, req.body, req.user.id);
  res.status(httpStatus[status]).json(data);
};

const deletePost = async (req, res) => {
  //
  const { status, data } = await postService.deletePost(req.params.id, req.user.id);
  res.status(httpStatus[status]).json(data);
};

const searchPosts = async (req, res) => {
  //
  const { status, data } = await postService.searchPosts(req.query.q);
  res.status(httpStatus[status]).json(data);
};

module.exports = {
  createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts, getPostsByUserId };