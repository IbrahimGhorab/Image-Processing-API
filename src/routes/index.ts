import { Router, Request, Response } from 'express';
import imageRoutes from './api/images';

const router = Router();

router.use('/image', imageRoutes);

router.get('/', (req: Request, res: Response) => {
  const message = `<h1>Welcome to image resize processing </h1>`;
  res.send(message);
});

export default router;
