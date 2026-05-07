import { Router } from 'express';

import usersRouter from './users.js';
import postsRouter from './posts.js';

const router = Router();

router.get('/', function (req, res, next) {
  res.render('home');
});

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router;