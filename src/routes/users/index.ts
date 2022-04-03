// imports
import { Router } from 'express';

// validation middleware imports
import {
    signupValidation,
    loginValidation,
    updateValidation,
    authMiddleware
} from '../../middleware';

// controllers imports
import {
    signUpUser,
    loginUser,
    fetchUser,
    logoutUser,
    updateUser,
    deleteUser
} from '../../controllers';

// router init and routes defs
const router: Router = Router();

router.post('/signup', signupValidation, signUpUser);
router.post('/login', loginValidation, loginUser);

router.get('/:id', fetchUser);

router.post('/logout', authMiddleware, logoutUser);

router.put('/update', authMiddleware, updateValidation, updateUser);

router.delete('/delete', authMiddleware, deleteUser);

// exports

export default router;
