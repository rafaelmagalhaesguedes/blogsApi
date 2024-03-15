//
const validatePost = ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    return { status: 'INVALID_DATA', data: { message: 'Some required fields are missing' } };
  }
};

module.exports = { validatePost };
