import express from 'express'
import { isAuthenticate, login, logout, registerUser, resetPassword } from '../controllers/user.controller.js';
import verifyJwt from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', verifyJwt, logout)
router.post('refresh-token', refreshAccessToken)
router.post('/change-password' , resetPassword)
router.post('/is-auth', verifyJwt, isAuthenticate)
export default router