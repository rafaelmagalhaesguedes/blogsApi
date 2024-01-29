const { Op } = require('sequelize');
const { User, BlogPost, Category, PostCategory } = require('../models');
const { postValidate } = require('./validations');

/* 
  The createPostCategory function is responsible for creating a new post category,
*/
const createPostCategory = async (categoryIds, postId) => {
  // Get categories from database
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  // Create new post categories
  const newPostCategories = categories.map((categorie) => ({ postId, categoryId: categorie.id }));
  await PostCategory.bulkCreate(newPostCategories);
};

/* 
  The createPost function is responsible for creating a new post,
*/
const createPost = async ({ title, content, categoryIds }, userId) => {
  // Validate post body and categories
  postValidate.validatePostBody({ title, content, categoryIds });
  await postValidate.validateCategory(categoryIds);

  // Create post and post categories
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};