// express imports
import { Router } from 'express';

// routers imports
import postsRouter from './posts';
import usersRouter from './users';

// router init and routes defs
const router: Router = Router();

router.use('/posts', postsRouter);

router.use('/users', usersRouter);

export default router;
