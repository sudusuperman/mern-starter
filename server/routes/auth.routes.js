import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

// Register a user
router.route('/register').post(AuthController.registerUser);

// Login a user
router.route('/login').post(AuthController.loginUser);

// Logout a user
router.route('/logout').post(AuthController.logoutUser);

// Ask for user profile
router.route('/profile:token').post(AuthController.userProfile);

export default router;
