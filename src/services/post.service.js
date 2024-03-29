const { blogRepository } = require('../repository');
const { postRepository } = require('../repository');
const { categoryRepository } = require('../repository');

const createPost = async ({ title, content, categoryIds }, userId) => {
  //
  const categories = await categoryRepository.checkCategoriesExist(categoryIds);
  if (!categories) {
    return { status: 'INVALID_VALUE', data: { message: 'one or more "categoryIds" not found' } };
  }

  try {
    const newPost = await postRepository.create({ title, content, categoryIds, userId });
    return { status: 'CREATED', data: newPost };
  } catch (error) {
    console.log(error.message);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Error an create a new post.' } };
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

  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  const postUpdated = await postRepository.update(id, { title, content }, userId);

  if (!postUpdated) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Error on update post' } };
  }

  return { status: 'SUCCESSFUL', data: postUpdated };
};

const deletePost = async (postId, userId) => {
  //
  const post = await postRepository.findById(postId);

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

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