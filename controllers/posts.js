import HttpErrors from 'http-errors';

import Posts from '../models/posts.js';

export default {
  async getAllPosts(req, res, next) {
    try {
      const posts = await Posts.getAllPosts();

      return res.json(posts);
    } catch (e) {
      next(e);
    }
  },

  async getPostById(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Posts.getPostById(id);

      if (!post) {
        throw new HttpErrors(404, {
          message: 'Post not found',
        });
      }

      return res.json(post);
    } catch (e) {
      next(e);
    }
  },

  async createPost(req, res, next) {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        throw new HttpErrors(400, {
          message: 'Title and content are required',
        });
      }

      const newPost = await Posts.createPost({
        title,
        content,
      });

      return res.status(201).json({
        message: 'Post created',
        post: newPost,
      });
    } catch (e) {
      next(e);
    }
  },

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedPost = await Posts.updatePost(id, {
        title,
        content,
      });

      if (!updatedPost) {
        throw new HttpErrors(404, {
          message: 'Post not found',
        });
      }

      return res.json({
        message: 'Post updated',
        post: updatedPost,
      });
    } catch (e) {
      next(e);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;

      const deleted = await Posts.deletePost(id);

      if (!deleted) {
        throw new HttpErrors(404, {
          message: 'Post not found',
        });
      }

      return res.json({
        message: 'Post deleted',
      });
    } catch (e) {
      next(e);
    }
  },
};