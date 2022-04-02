// express imports
import { Router } from 'express';

// routers imports
import postsRouter from './posts';

// router init and routes defs
const router: Router = Router();

router.use('/posts', postsRouter);

export default router;
