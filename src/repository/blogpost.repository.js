const { BlogPost } = require('../models');

const checkPostExist = async (id) => {
  //
  const post = await BlogPost.findByPk(id);
  if (!post) return null;

  return post;
};

const checkPostByUserId = async (postId, userId) => {
  //
  const post = await BlogPost.findOne({ where: { id: postId } });
  
  if (!post) return null;

  if (post.userId !== userId) return null;

  return post;
};

const validateUserToDeletePost = async (postId, userId) => {
  //
  const post = await BlogPost.findOne({ where: { id: postId } });
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
}; 

module.exports = {
  checkPostExist,
  checkPostByUserId,
  validateUserToDeletePost,
};
