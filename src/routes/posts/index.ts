// express imports
import { Router } from 'express';

// validation middleware imports
import {
    createPostValidation,
    updatePostValidation,
    validatePostParams
} from '../../middleware';

// auth middleware imports
import { authMiddleware } from '../../middleware';

// controllers imports
import {
    fetchPostsMany,
    fetchPostsSingle,
    fetchPostsByAuthor,
    createPost,
    updatePost,
    deletePost
} from '../../controllers';

// router init and routes defs
const router: Router = Router();

router.get('/', fetchPostsMany);
router.get('/:id', validatePostParams, fetchPostsSingle);

router.get('/user/:id', validatePostParams, fetchPostsByAuthor);

router.post('/', authMiddleware, createPostValidation, createPost);

router.put(
    '/:id',
    authMiddleware,
    validatePostParams,
    updatePostValidation,
    updatePost
);

router.delete('/:id', authMiddleware, validatePostParams, deletePost);

export default router;
