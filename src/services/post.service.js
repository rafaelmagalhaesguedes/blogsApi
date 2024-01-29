/* eslint-disable max-lines */
const { Op } = require('sequelize');
const { User, BlogPost, Category, PostCategory } = require('../models');
const { postValidate } = require('./validations');

/* 
  The createPostCategory function is responsible for creating a new post category,
*/
const createPostCategory = async (categoryIds, postId) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  const newPostCategories = categories.map((categorie) => ({ postId, categoryId: categorie.id }));

  await PostCategory.bulkCreate(newPostCategories);
};

/* 
  The createPost function is responsible for creating a new post,
*/
const createPost = async ({ title, content, categoryIds }, userId) => {
  postValidate.validatePostBody({ title, content, categoryIds });
  await postValidate.validateCategory(categoryIds);

  const newPost = await BlogPost.create({ title, content, userId });
  await createPostCategory(categoryIds, newPost.id);

  return { status: 'CREATED', data: newPost };
};

/* 
  The getAllPosts function is responsible for returning all posts, 
  including the user who created the post and the categories to 
  which the post belongs.
*/
const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) {
    return { status: 'NOT_FOUND', data: { message: 'Posts does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: posts };
};

/* 
  The getPostById function is responsible for returning a post by id, 
  including the user who created the post and the categories to which 
  the post belongs.
*/
const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: post };
};

/* 
  The updatePost function is responsible for updating a post, 
  including the categories to which the post belongs.
*/
const updatePost = async (id, { title, content }, userId) => {
  // Check if post exists
  const post = await BlogPost.findByPk(id);
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  // Check if user is the post author
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  // Update post
  await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });

  const result = await BlogPost.findByPk(post.id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { status: 'SUCCESSFUL', data: result };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};