import { Router } from 'express';

const router = Router();


import controller from '../controllers/posts.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/posts.schema.js';

router.get(
  '/create',
  validation(schema.createPost, 'body'),
  controller.createPost,
);



export default router;