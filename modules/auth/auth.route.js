

import express from 'express';

const router = express.Router();

router.post('/auth/signup', AuthController.createUserController);
router.post('/auth/login', AuthController.loginUserController);


export const AuthRoutes = router;