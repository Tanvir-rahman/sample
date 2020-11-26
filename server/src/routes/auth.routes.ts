import { Router } from 'express';

import { signUp } from '../controllers/auth.controller';

const router = Router();

router.post('/signUp', signUp);
// router.post('/signIn', signIn);

export default router;