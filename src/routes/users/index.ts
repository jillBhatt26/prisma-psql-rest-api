// imports
import { Router } from 'express';

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

router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.get('/:id', fetchUser);

router.post('/logout', logoutUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

// exports

export default router;
