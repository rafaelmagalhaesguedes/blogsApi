const { BlogPost, PostCategory } = require('../models');
const { postValidate } = require('./validations');
const { search, create, findAll, findById } = require('./repository/post.repository');
const { httpError } = require('../utils/httpErrors');

const createPost = async ({ title, content, categoryIds }, userId) => {
  postValidate.validatePostBody({ title, content, categoryIds });
  await postValidate.validateCategory(categoryIds);

  const newPost = await create({ title, content, categoryIds, userId });

  return { status: 'CREATED', data: newPost };
};

const getAllPosts = async () => {
  const posts = await findAll();
  if (!posts) return { status: 'NOT_FOUND', data: { message: 'Posts does not exist' } };

  return { status: 'SUCCESSFUL', data: posts };
};

const getPostById = async (id) => {
  const post = await findById(id);
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

  return { status: 'SUCCESSFUL', data: post };
};

const updatePost = async (id, { title, content }, userId) => {
  postValidate.validatePostBody({ title, content, categoryIds: [] });
  const post = await postValidate.checkPostExist(id);
  postValidate.checkUserIsAuthor(post, userId);

  await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
  const { status, data } = await getPostById(post.id);

  return { status, data };
};

const deletePost = async (postId, userId) => {
  const post = await BlogPost.findOne({ where: { id: postId } });

  if (!post) throw httpError('Post does not exist', 404);
  if (post.userId !== userId) throw httpError('Unauthorized user', 401);

  await PostCategory.destroy({ where: { postId } });
  await BlogPost.destroy({ where: { id: postId } });

  return { status: 'NO_CONTENT', data: null };
};

const searchPosts = async (searchString) => {
  if (searchString === '') return getAllPosts();
  
  const result = await search(searchString);

  return { status: 'SUCCESSFUL', data: result };
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts };