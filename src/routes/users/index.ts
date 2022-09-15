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
import { AccountControllers } from '../../controllers';

// router init and routes defs
const router: Router = Router();

router.get('/', authMiddleware, AccountControllers.fetchUser);

router.post('/signup', signupValidation, AccountControllers.signUpUser);

router.post('/login', loginValidation, AccountControllers.loginUser);

router.post('/logout', authMiddleware, AccountControllers.logoutUser);

router.put(
    '/update',
    authMiddleware,
    updateValidation,
    AccountControllers.updateUser
);

router.delete('/delete', authMiddleware, AccountControllers.deleteUser);

// exports
export default router;
