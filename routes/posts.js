import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Post',
  });
});

router.post('/', (req, res) => {
  res.json({
    message: 'Welcome to Post',
  });
});

export default router;