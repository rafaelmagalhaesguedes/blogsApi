const { User, BlogPost, Category } = require('../models');
const { postValidate } = require('./validations');
const { createPostCategory } = require('./category.service');
const { httpError } = require('../utils/httpErrors');

const createPost = async ({ title, content, categoryIds }, userId) => {
  postValidate.validatePostBody({ title, content, categoryIds });
  await postValidate.validateCategory(categoryIds);

  const newPost = await BlogPost.create({ title, content, userId });
  await createPostCategory(categoryIds, newPost.id);

  return { status: 'CREATED', data: newPost };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!posts) return { status: 'NOT_FOUND', data: { message: 'Posts does not exist' } };

  return { status: 'SUCCESSFUL', data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
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

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) throw httpError('Post does not exist', 404);
  if (userId !== post.userId) throw httpError('Unauthorized user', 401);

  return { status: 'NO_CONTENT', data: { message: 'Post successfully deleted' } };
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };