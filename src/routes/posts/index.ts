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
// import {
//     fetchPostsMany,
//     fetchPostsSingle,
//     fetchPostsByAuthor,
//     createPost,
//     updatePost,
//     deletePost
// } from '../../controllers';

import { PostControllers } from '../../controllers';

// router init and routes defs
const router: Router = Router();

router.get('/:id', validatePostParams, PostControllers.fetchPostSingle);

router.get('/user/:id', validatePostParams, PostControllers.fetchPostsByAuthor);

router.post(
    '/',
    authMiddleware,
    createPostValidation,
    PostControllers.createPost
);

router.put(
    '/:id',
    authMiddleware,
    validatePostParams,
    updatePostValidation,
    PostControllers.updatePost
);

router.delete(
    '/:id',
    authMiddleware,
    validatePostParams,
    PostControllers.deletePost
);

export default router;
