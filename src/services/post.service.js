const { blogRepository } = require('../repository');
const { postRepository } = require('../repository');
const { categoryRepository } = require('../repository');

const createPost = async ({ title, content, categoryIds }, userId) => {
  //
  const categories = await categoryRepository.validateCategory(categoryIds);
  if (!categories) {
    return { status: 'BAD_REQUEST', data: { message: 'One or more "categoryIds" not found' } };
  }

  try {
    const newPost = await postRepository.create({ title, content, categoryIds, userId });
    return { status: 'CREATED', data: newPost };
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
  }
};

const getAllPosts = async () => {
  //
  const posts = await postRepository.findAll();
  
  if (!posts) return { status: 'NOT_FOUND', data: { message: 'Posts does not exist' } };

  return { status: 'SUCCESSFUL', data: posts };
};

const getPostsByUserId = async (userId) => {
  //
  const posts = await postRepository.findAllByUserId(userId);

  if (!posts) return { status: 'NOT_FOUND', data: { message: 'Posts does not exist' } };

  return { status: 'SUCCESSFUL', data: posts };
};

const getPostById = async (id) => {
  //
  const post = await postRepository.findById(id);

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

  return { status: 'SUCCESSFUL', data: post };
};

const updatePost = async (id, { title, content }, userId) => {
  //
  const post = await blogRepository.checkPostExist(id);

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  try {
    const postUpdated = await postRepository.update(id, { title, content }, userId);
    return { status: 'SUCCESSFUL', data: postUpdated };
  } catch (error) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: error.message } };
  }
};

const deletePost = async (postId, userId) => {
  //
  await blogRepository.validateUserToDeletePost(postId, userId);

  const { status, data } = await postRepository.destroy(postId);
  
  return { status, data };
};

const searchPosts = async (searchString) => {
  //
  if (searchString === '') return getAllPosts();
  
  const searchResult = await postRepository.search(searchString);

  return { status: 'SUCCESSFUL', data: searchResult };
};

module.exports = {
  createPost, getAllPosts, getPostById, updatePost, deletePost, searchPosts, getPostsByUserId };