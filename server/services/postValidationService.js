import Joi from "joi";

const newPostValidationSchema = Joi.object({
  userId: Joi.string(),
  username: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  tags: Joi.array(),
  image: Joi.any(),
});

const validateNewPost = (postData) => {
  return newPostValidationSchema.validate(postData);
};

const newCommentValidationSchema = Joi.object({
  postId: Joi.string(),
  comment: { text: Joi.string(), userId: Joi.string(), username: Joi.string() },
  userId: Joi.string(),
  username: Joi.string(),
});

const validateNewComment = (commentData) => {
  return newCommentValidationSchema.validate(commentData);
};

export { validateNewPost, validateNewComment };
