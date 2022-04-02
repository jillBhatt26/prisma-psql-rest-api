// express imports
import { Router } from 'express';

// validation middleware imports
import {
    createPostValidation,
    updatePostValidation,
    validatePostParams
} from '../../middleware/validation';

// controllers imports
import {
    fetchPostsMany,
    fetchPostsSingle,
    createPost,
    updatePost,
    deletePost
} from '../../controllers';

// router init and routes defs
const router: Router = Router();

router.get('/', fetchPostsMany);
router.get('/:id', validatePostParams, fetchPostsSingle);

router.post('/', createPostValidation, createPost);

router.put('/:id', validatePostParams, updatePostValidation, updatePost);

router.delete('/:id', validatePostParams, deletePost);

export default router;
