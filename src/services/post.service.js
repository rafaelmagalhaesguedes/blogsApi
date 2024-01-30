const { BlogPost } = require('../models');
const { postValidate } = require('./validations');
const { search, create, findAll, findById, destroy } = require('./repository/post.repository');

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
  await postValidate.validateUserToDeletePost(postId, userId);

  const { status, data } = await destroy(postId);
  
  return { status, data };
};

const searchPosts = async (searchString) => {
  if (searchString === '') return getAllPosts();
  
  const result = await search(searchString);

  return { status: 'SUCCESSFUL', data: result };
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts };