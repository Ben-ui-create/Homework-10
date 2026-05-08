import Joi from 'joi';

export default {
  createPost: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),

  updatePost: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),

  deletePost: Joi.object({
    id: Joi.string().required(),
  })
}